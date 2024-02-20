import { Repository } from 'typeorm';
import { CreateFuneralDto } from '../dto/create-funeral.dto';
import { Funeral } from '../entities/funeral.entity';
import { StoreFlorist } from 'src/store-florist/entities/store-florist.entity';
import { Usuario } from 'src/user-type/entities/user-type.entity';
import { UpdateFuneralDto } from '../dto/update-funeral.dto';
export declare class FuneralService {
    private funeralRepository;
    private userRepository;
    private storeRepository;
    constructor(funeralRepository: Repository<Funeral>, userRepository: Repository<Usuario>, storeRepository: Repository<StoreFlorist>);
    create(createFuneralDto: CreateFuneralDto): Promise<Funeral>;
    findAll(): Promise<Funeral[]>;
    findAllByUser(userId: number): Promise<Funeral[]>;
    findOne(id: number): Promise<Funeral>;
    update(id: number, data: UpdateFuneralDto | Partial<Funeral>): Promise<Funeral>;
    remove(id: number): Promise<Funeral>;
    removeAll(): Promise<import("typeorm").DeleteResult>;
    removeAllByUser(userId: number): Promise<import("typeorm").DeleteResult>;
    getStoreProductsForFuneral(funeralUserId: number): Promise<import("../../cat/entities/cat.entity").Cat[]>;
}
