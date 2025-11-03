import { RootKeys, EnvVar, RootKeyType } from '../commons/types/config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigsService {
    constructor(
        @Inject() private configService: ConfigService
    ) { }

    get<T extends RootKeys<EnvVar>>(propertyPath: T): RootKeyType<EnvVar, T> {
        const value = this.configService.get(propertyPath);
        return value as RootKeyType<EnvVar, T>;
    }
}
