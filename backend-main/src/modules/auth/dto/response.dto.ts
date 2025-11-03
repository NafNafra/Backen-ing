import { HttpStatus } from "@nestjs/common"

export type AuthResponse = {
  user: { name: string, phoneNumber: string },
  message: string,
  statusCode: HttpStatus,
  accessToken: string,
  refreshToken: string, 
}