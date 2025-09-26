import { IsString, IsEmail } from 'class-validator';


export class CreateUserDto {
  @IsString()
  readonly username: string;
  
  @IsEmail()
  readonly email: string;
  
  @IsString()
  readonly phone: string;
}

export class UpdateUserDto {
  readonly username?: string;
  readonly email?: string;
  readonly phone?: string;
}

export class LogUserDto{
  @IsEmail()
  readonly email:string;
  
  @IsString()
  readonly phone:string;
}