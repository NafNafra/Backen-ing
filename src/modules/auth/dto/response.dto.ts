import { HttpStatus } from "@nestjs/common"

export type AuthResponse = {
  user: { id: string, phoneNumber: string },
  message: string,
  statusCode: HttpStatus,
  accessToken: string,
  refreshToken: string, 

}