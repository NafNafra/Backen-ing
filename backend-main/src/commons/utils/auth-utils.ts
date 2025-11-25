import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { ConfigsService } from '@/configs';
import { UsersService } from '@/modules/user/user.service';
import { payload } from '@/commons/types/auth';

export async function generateTokens(
  jwtService: JwtService,
  configsService: ConfigsService,
  payload: payload,
): Promise<{ access_token: string; refresh_token: string }> {
  const access_token = await jwtService.signAsync(payload, {
    secret: configsService.get('jwt.secret'),
    expiresIn: configsService.get('jwt.expiresIn'),
  });

  const refresh_token = await jwtService.signAsync(payload, {
    secret: configsService.get('jwt.refresh.secret'),
    expiresIn: configsService.get('jwt.refresh.expiresIn'),
  });
  // console.log(refresh_token);
  return { access_token, refresh_token };
}

export async function storeRefreshToken(
  usersService: UsersService,
  userId: Types.ObjectId,
  refreshToken: string,
): Promise<void> {
  const hashedToken = await bcrypt.hash(refreshToken, 10);
  // console.log(hashedToken);
  await usersService.update(userId, {
    refreshToken: hashedToken,
    activated: true,
  });
}

export async function refreshAccessToken(
  jwtService: JwtService,
  configsService: ConfigsService,
  usersService: UsersService,
  refreshToken: string,
): Promise<{ access_token: string }> {
  const payload = jwtService.verify(refreshToken, {
    secret: configsService.get('jwt.refresh.secret'),
  });

  const user = await usersService.findById(payload.id);
  if (!user || !user.refreshToken) {
    throw new Error('Invalid refresh token');
  }

  const isTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
  if (!isTokenValid) {
    throw new Error('Invalid refresh token');
  }

  const newAccessToken = await jwtService.signAsync(
    { id: user._id, phoneNumber: user.phoneNumber, activated: user.activated },
    {
      secret: configsService.get('jwt.secret'),
      expiresIn: configsService.get('jwt.expiresIn'),
    },
  );

  return { access_token: newAccessToken };
}
