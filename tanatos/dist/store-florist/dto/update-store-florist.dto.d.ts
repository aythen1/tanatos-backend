import { StoreFloristUpdateDto } from '../../user-type/dto/store-florist.dto';
import { UpdateCatDto } from 'src/cat/dto/update-cat.dto';
export declare class UpdateStoreFloristDto {
    phone?: string;
    location?: string;
    lat?: number;
    lng?: number;
    name?: string;
    user_id?: number;
    cat?: UpdateCatDto[];
    stores?: StoreFloristUpdateDto[];
}
