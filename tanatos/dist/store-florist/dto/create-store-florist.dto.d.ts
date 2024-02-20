import { StoreFloristCreateDto } from '../../user-type/dto/store-florist.dto';
import { CreateCatDto } from 'src/cat/dto/create-cat.dto';
export declare class CreateStoreFloristDto {
    phone: string;
    location: string;
    lat: number;
    lng: number;
    name: string;
    user_id: number;
    stores?: StoreFloristCreateDto[];
    cat?: CreateCatDto[];
}
