"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatResponseDto = void 0;
class CertificatResponseDto {
    constructor(certificat) {
        this.idStudent = certificat.idStudent;
        this.linkImage = certificat.linkImage;
        this.isPublik = certificat.isPublik;
    }
    id;
    idStudent;
    linkImage;
    isPublik;
}
exports.CertificatResponseDto = CertificatResponseDto;
//# sourceMappingURL=response-certificat.dto.js.map