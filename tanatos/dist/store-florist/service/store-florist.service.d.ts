import { Repository } from 'typeorm';
import { StoreFlorist } from '../entities/store-florist.entity';
import { Usuario } from '../../user-type/entities/user-type.entity';
import { CreateStoreFloristDto } from '../dto/create-store-florist.dto';
import { Cat } from 'src/cat/entities/cat.entity';
export declare class StoreFloristService {
    private readonly storeFloristRepository;
    private readonly usuarioRepository;
    constructor(storeFloristRepository: Repository<StoreFlorist>, usuarioRepository: Repository<Usuario>);
    create(createStoreFloristDTO: CreateStoreFloristDto, userId: number, name: string, location: string, lat: number, lng: number): Promise<StoreFlorist>;
    delete(id: number): Promise<void>;
    findByUserId(userId: number): Promise<StoreFlorist[]>;
    findByName(name: string): Promise<StoreFlorist[]>;
    findCatsByStoreId(storeId: number): Promise<Cat[]>;
    findAllWithCats(): Promise<StoreFlorist[]>;
}
