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
exports.FuneralController = void 0;
const common_1 = require("@nestjs/common");
const create_funeral_dto_1 = require("../dto/create-funeral.dto");
const update_funeral_dto_1 = require("../dto/update-funeral.dto");
const funeral_service_1 = require("../service/funeral.service");
const store_florist_entity_1 = require("../../store-florist/entities/store-florist.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_type_entity_1 = require("../../user-type/entities/user-type.entity");
const upload_1 = require("../../user-type/upload");
const multer_1 = require("multer");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
let FuneralController = class FuneralController {
    constructor(funeralService, userRepository, storeRepository) {
        this.funeralService = funeralService;
        this.userRepository = userRepository;
        this.storeRepository = storeRepository;
    }
    async create(createFuneralDto) {
        return this.funeralService.create(createFuneralDto);
    }
    async findAll() {
        return this.funeralService.findAll();
    }
    async findAllByUser(userId) {
        return this.funeralService.findAllByUser(userId);
    }
    async findOne(id) {
        return this.funeralService.findOne(+id);
    }
    async update(id, updateFuneralDto) {
        return this.funeralService.update(+id, updateFuneralDto);
    }
    async remove(id) {
        return this.funeralService.remove(+id);
    }
    async removeAll() {
        return this.funeralService.removeAll();
    }
    async removeAllByUser(userId) {
        return this.funeralService.removeAllByUser(userId);
    }
    async getStoreProductsForFuneral(funeralUserId) {
        try {
            return await this.funeralService.getStoreProductsForFuneral(funeralUserId);
        }
        catch (error) {
            throw error;
        }
    }
    async uploadFiles(files, id) {
        console.log(files);
        const photoUrls = await Promise.all([
            (0, upload_1.default)(files.image[0].path),
            (0, upload_1.default)(files.ceremonia_image[0].path),
            (0, upload_1.default)(files.funeral_image[0].path),
        ]);
        console.log(`Actualizando funeral con ID ${id}...`);
        console.log(photoUrls, 'estas serían las URLs');
        const funeral = await this.funeralService.findOne(parseInt(id, 10));
        if (!funeral) {
            throw new common_1.NotFoundException(`Funeral con ID ${id} no encontrado`);
        }
        funeral.image = photoUrls[0];
        funeral.ceremonia_image = photoUrls[1];
        funeral.funeral_image = photoUrls[2];
        return this.funeralService.update(parseInt(id, 10), funeral);
    }
};
exports.FuneralController = FuneralController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_funeral_dto_1.CreateFuneralDto]),
    __metadata("design:returntype", Promise)
], FuneralController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FuneralController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FuneralController.prototype, "findAllByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FuneralController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_funeral_dto_1.UpdateFuneralDto]),
    __metadata("design:returntype", Promise)
], FuneralController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FuneralController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FuneralController.prototype, "removeAll", null);
__decorate([
    (0, common_1.Delete)('/user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FuneralController.prototype, "removeAllByUser", null);
__decorate([
    (0, common_1.Get)(':funeralUserId/products'),
    __param(0, (0, common_1.Param)('funeralUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FuneralController.prototype, "getStoreProductsForFuneral", null);
__decorate([
    (0, common_1.Post)('upload-images/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'image', maxCount: 1 },
        { name: 'ceremonia_image', maxCount: 1 },
        { name: 'funeral_image', maxCount: 1 },
    ], {
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
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FuneralController.prototype, "uploadFiles", null);
exports.FuneralController = FuneralController = __decorate([
    (0, common_1.Controller)('funerals'),
    __param(1, (0, typeorm_1.InjectRepository)(user_type_entity_1.Usuario)),
    __param(2, (0, typeorm_1.InjectRepository)(store_florist_entity_1.StoreFlorist)),
    __metadata("design:paramtypes", [funeral_service_1.FuneralService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FuneralController);
//# sourceMappingURL=funeral.controller.js.map