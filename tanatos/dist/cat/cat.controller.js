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
exports.CatController = void 0;
const common_1 = require("@nestjs/common");
const cat_service_1 = require("./cat.service");
const create_cat_dto_1 = require("./dto/create-cat.dto");
const update_cat_dto_1 = require("./dto/update-cat.dto");
const upload_1 = require("../user-type/upload");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let CatController = class CatController {
    constructor(catService) {
        this.catService = catService;
    }
    async createCat(createCatDto) {
        return this.catService.create(createCatDto);
    }
    async uploadFile(file, id) {
        try {
            console.log('Archivo subido:', file);
            console.log('Subiendo imagen a Cloudinary...');
            const photoUrl = await (0, upload_1.default)(file.path);
            console.log('Imagen subida:', photoUrl);
            console.log(`Actualizando Cat con ID ${id}...`);
            const cat = await this.catService.findOne(id);
            if (!cat) {
                throw new common_1.NotFoundException(`Cat con ID ${id} no encontrado`);
            }
            cat.image = photoUrl;
            const updatedCat = await this.catService.update(id, cat);
            console.log('Cat actualizado:', updatedCat);
            return updatedCat;
        }
        catch (error) {
            console.error('Error al procesar la solicitud:', error);
            throw new common_1.InternalServerErrorException('Error al procesar la solicitud');
        }
    }
    findAll() {
        return this.catService.findAll();
    }
    findOne(id) {
        return this.catService.findOne(+id);
    }
    update(id, updateCatDto) {
        return this.catService.update(+id, updateCatDto);
    }
    remove(id) {
        return this.catService.remove(+id);
    }
};
exports.CatController = CatController;
__decorate([
    (0, common_1.Post)('flower'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cat_dto_1.CreateCatDto]),
    __metadata("design:returntype", Promise)
], CatController.prototype, "createCat", null);
__decorate([
    (0, common_1.Post)('upload-image/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                return cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CatController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cat_dto_1.UpdateCatDto]),
    __metadata("design:returntype", void 0)
], CatController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatController.prototype, "remove", null);
exports.CatController = CatController = __decorate([
    (0, common_1.Controller)('cat'),
    __metadata("design:paramtypes", [cat_service_1.CatService])
], CatController);
//# sourceMappingURL=cat.controller.js.map