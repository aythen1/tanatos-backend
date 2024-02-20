import { Usuario } from 'src/user-type/entities/user-type.entity';
export declare class Funeral {
    id: number;
    image: string;
    name: string;
    description: string;
    account_type?: string;
    favorite: boolean;
    ceremonia_image: any;
    funeral_image: string;
    funeral_date: Date;
    funeral_time: string;
    church_date: Date;
    church_time: string;
    funeral_location: string;
    funeral_lat: number;
    funeral_lng: number;
    church_location: string;
    church_lat: number;
    church_lng: number;
    user: Usuario;
}
