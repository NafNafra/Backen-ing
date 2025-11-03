"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientResponseDto = exports.ClientResponseDto = void 0;
class ClientResponseDto {
    constructor(user) {
        this.id = user._id;
        this.idUser = user.idUser;
        this.name = user.name;
        this.phoneNumber = user.phoneNumber;
        this.email = user.email;
        this.activated = user.activated;
        this.reactivationDate = user.reactivationDate;
        this.refreshToken = user.refreshToken;
    }
    id;
    idUser;
    name;
    phoneNumber;
    activated;
    reactivationDate;
    refreshToken;
    email;
}
exports.ClientResponseDto = ClientResponseDto;
class UpdateClientResponseDto {
    constructor(data, message, statusCode) {
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
    }
    data;
    message;
    statusCode;
}
exports.UpdateClientResponseDto = UpdateClientResponseDto;
//# sourceMappingURL=response-client.dto.js.map