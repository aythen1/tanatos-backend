import { CreateFuneralDto } from '../dto/create-funeral.dto';
import { UpdateFuneralDto } from '../dto/update-funeral.dto';
import { FuneralService } from '../service/funeral.service';
import { StoreFlorist } from 'src/store-florist/entities/store-florist.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/user-type/entities/user-type.entity';
import { Multer } from 'multer';
export declare class FuneralController {
    private readonly funeralService;
    private readonly userRepository;
    private readonly storeRepository;
    constructor(funeralService: FuneralService, userRepository: Repository<Usuario>, storeRepository: Repository<StoreFlorist>);
    create(createFuneralDto: CreateFuneralDto): Promise<import("../entities/funeral.entity").Funeral>;
    findAll(): Promise<import("../entities/funeral.entity").Funeral[]>;
    findAllByUser(userId: number): Promise<import("../entities/funeral.entity").Funeral[]>;
    findOne(id: string): Promise<import("../entities/funeral.entity").Funeral>;
    update(id: string, updateFuneralDto: UpdateFuneralDto): Promise<import("../entities/funeral.entity").Funeral>;
    remove(id: string): Promise<import("../entities/funeral.entity").Funeral>;
    removeAll(): Promise<import("typeorm").DeleteResult>;
    removeAllByUser(userId: number): Promise<import("typeorm").DeleteResult>;
    getStoreProductsForFuneral(funeralUserId: number): Promise<import("../../cat/entities/cat.entity").Cat[]>;
    uploadFiles(files: {
        image: Multer.File[];
        ceremonia_image: Multer.File[];
        funeral_image: Multer.File[];
    }, id: string): Promise<import("../entities/funeral.entity").Funeral>;
}
