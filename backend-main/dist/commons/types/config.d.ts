import { configuration } from '../../configs';
export type EnvVar = ReturnType<typeof configuration>;
export type RootKeys<T> = T extends object ? (({
    [K in keyof T]: `${Exclude<K, symbol>}${RootKeys<T[K]> extends never ? '' : `.${RootKeys<T[K]>}`}`;
}[keyof T]) | `${Exclude<keyof T, symbol>}`) : never;
export type RootKeyType<T, S extends string> = S extends `${infer T1}.${infer T2}` ? T1 extends keyof T ? RootKeyType<T[T1], T2> : never : S extends keyof T ? T[S] : never;
