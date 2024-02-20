import { Funeral } from 'src/funeral/entities/funeral.entity';
import { StoreFlorist } from 'src/store-florist/entities/store-florist.entity';
export declare class Usuario {
    id: number;
    username: string;
    email: string;
    password: string;
    address: string;
    city: string;
    state: string;
    country: string;
    photo: string | null;
    phone: string;
    lat: number;
    lng: number;
    dob: string;
    gender: string | null;
    user_type: string;
    old_password: string | null;
    store: StoreFlorist[];
    esquela: Funeral[];
    verificationCode: string;
    verificationCodeExpiration: Date;
}
