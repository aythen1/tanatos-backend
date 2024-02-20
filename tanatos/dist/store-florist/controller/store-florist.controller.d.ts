import { StoreFloristService } from '../service/store-florist.service';
import { CreateStoreFloristDto } from '../dto/create-store-florist.dto';
export declare class StoreFloristController {
    private readonly storeFloristService;
    constructor(storeFloristService: StoreFloristService);
    create(createStoreFloristDto: CreateStoreFloristDto, userId: number, name: string, location: string, lng: number, lat: number): Promise<import("../entities/store-florist.entity").StoreFlorist>;
    delete(id: number): Promise<void>;
    findByUserId(userId: number): Promise<import("../entities/store-florist.entity").StoreFlorist[]>;
    findByName(name: string): Promise<import("../entities/store-florist.entity").StoreFlorist[]>;
    findCatsByStoreId(id: number): Promise<import("../../cat/entities/cat.entity").Cat[]>;
    findAllWithCats(): Promise<import("../entities/store-florist.entity").StoreFlorist[]>;
}
