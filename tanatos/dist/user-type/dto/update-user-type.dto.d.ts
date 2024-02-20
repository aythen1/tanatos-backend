import { CreateUsuarioDto } from './create-user-type.dto';
import { StoreFloristCreateDto } from './store-florist.dto';
declare const UpdateUsuarioDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUsuarioDto>>;
export declare class UpdateUsuarioDto extends UpdateUsuarioDto_base {
    name: string;
    password: string;
    email: string;
    phone: string;
    phoneNumber: string;
    token: string;
    city?: string;
    country?: string;
    gender?: string;
    dob?: string;
    photo?: string;
    old_password?: string;
    stores?: StoreFloristCreateDto[];
}
export {};
