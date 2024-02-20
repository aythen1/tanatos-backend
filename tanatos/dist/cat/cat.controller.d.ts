import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
export declare class CatController {
    private readonly catService;
    constructor(catService: CatService);
    createCat(createCatDto: CreateCatDto): Promise<import("./entities/cat.entity").Cat>;
    uploadFile(file: any, id: number): Promise<import("./entities/cat.entity").Cat>;
    findAll(): Promise<import("./entities/cat.entity").Cat[]>;
    findOne(id: string): Promise<import("./entities/cat.entity").Cat>;
    update(id: string, updateCatDto: UpdateCatDto): Promise<import("./entities/cat.entity").Cat>;
    remove(id: string): Promise<void>;
}
