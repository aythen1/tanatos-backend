"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cat_entity_1 = require("./entities/cat.entity");
const cloudinary_1 = require("cloudinary");
let CatService = class CatService {
    constructor(catRepository) {
        this.catRepository = catRepository;
    }
    async create(createCatDto) {
        const cat = this.catRepository.create(createCatDto);
        return this.catRepository.save(cat);
    }
    async uploadImage(id, image) {
        console.log('Comenzando servicio de carga de imagen');
        const cat = await this.catRepository.findOne({ where: { id } });
        if (!cat) {
            throw new Error('Cat not found');
        }
        cloudinary_1.v2.config({
            secure: true,
            api_key: 'your_api_key',
            cloud_name: 'your_cloud_name',
            api_secret: 'your_api_secret',
        });
        try {
            const result = await cloudinary_1.v2.uploader.upload(image.path);
            const imageUrl = result.url;
            cat.image = imageUrl;
            await this.catRepository.save(cat);
            return cat;
        }
        catch (error) {
            console.error('Error al subir imagen a Cloudinary:', error);
            throw new Error('Error al subir imagen a Cloudinary');
        }
    }
    async findAll() {
        return this.catRepository.find();
    }
    async findOne(id) {
        return this.catRepository.findOne({ where: { id } });
    }
    async update(id, updateCatDto) {
        const cat = await this.catRepository.findOne({ where: { id } });
        if (!cat) {
            throw new Error('Cat not found');
        }
        this.catRepository.merge(cat, updateCatDto);
        return this.catRepository.save(cat);
    }
    async remove(id) {
        await this.catRepository.delete(id);
    }
};
exports.CatService = CatService;
exports.CatService = CatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cat_entity_1.Cat)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CatService);
//# sourceMappingURL=cat.service.js.map