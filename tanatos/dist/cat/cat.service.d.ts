import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
export declare class CatService {
    private catRepository;
    constructor(catRepository: Repository<Cat>);
    create(createCatDto: CreateCatDto): Promise<Cat>;
    uploadImage(id: number, image: any): Promise<Cat>;
    findAll(): Promise<Cat[]>;
    findOne(id: number): Promise<Cat>;
    update(id: number, updateCatDto: UpdateCatDto): Promise<Cat>;
    remove(id: number): Promise<void>;
}
