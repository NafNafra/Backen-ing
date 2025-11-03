import { Exclude } from "class-transformer";
import { IsString, IsOptional, IsBoolean, Length, IsEmail, IsNumberString } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsNumberString()
  idUser: string

  @IsString({ message: "Nom invalide" })
  @IsOptional()
  name?: string;

  @IsString({ message: "Numéro de téléphone invalide" })
  @IsOptional()
  @Length(10, 10, { message: "Numéro de téléphone invalide (10 chiffres requis)" })
  phoneNumber?: string;

  @IsBoolean({ message: "Statut d'activation invalide" })
  @IsOptional()
  activated?: boolean;

  @IsString({ message: "Code Otp invalide" })
  @IsOptional()
  _OtpCode?: string;

  @IsString({ message: "Date d'expiration Otp invalide" })
  @IsOptional()
  _OtpExpiresAt?: string;

  @IsString()
  @IsOptional()
  @Exclude()
  reactivationDate?: string;

  @IsString()
  @IsOptional()
  @Exclude()
  refreshToken?: string | null;

  @IsOptional()
  @IsEmail()
  email?: string;
}
