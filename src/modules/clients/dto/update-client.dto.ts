import { ApiHideProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsString, IsOptional, IsBoolean, Length, IsEmail } from "class-validator";

export class UpdateClientDto {
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
  @ApiHideProperty()
  reactivationDate?: string;

  @IsString()
  @IsOptional()
  @Exclude()
  @ApiHideProperty()
  refreshToken?: string | null;

  @IsOptional()
  @IsEmail()
  email?: string;

}