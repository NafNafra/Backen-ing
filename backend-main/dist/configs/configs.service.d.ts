import { RootKeys, EnvVar, RootKeyType } from '../commons/types/config';
import { ConfigService } from '@nestjs/config';
export declare class ConfigsService {
    private configService;
    constructor(configService: ConfigService);
    get<T extends RootKeys<EnvVar>>(propertyPath: T): RootKeyType<EnvVar, T>;
}
