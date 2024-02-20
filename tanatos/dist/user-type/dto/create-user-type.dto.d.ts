import { StoreFloristCreateDto } from '../../user-type/dto/store-florist.dto';
export declare class CreateUsuarioDto {
    username: string;
    email: string;
    password: string;
    address: string;
    city: string;
    state: string;
    country: string;
    photo?: string;
    phone: string;
    phoneNumber: string;
    token: string;
    lat: number;
    lng: number;
    dob: string;
    gender?: string;
    user_type: string;
    old_password?: string;
    stores?: StoreFloristCreateDto[];
}
