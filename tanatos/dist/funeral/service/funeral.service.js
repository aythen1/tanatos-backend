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
exports.FuneralService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const funeral_entity_1 = require("../entities/funeral.entity");
const store_florist_entity_1 = require("../../store-florist/entities/store-florist.entity");
const user_type_entity_1 = require("../../user-type/entities/user-type.entity");
let FuneralService = class FuneralService {
    constructor(funeralRepository, userRepository, storeRepository) {
        this.funeralRepository = funeralRepository;
        this.userRepository = userRepository;
        this.storeRepository = storeRepository;
    }
    async create(createFuneralDto) {
        const newFuneral = this.funeralRepository.create(createFuneralDto);
        return this.funeralRepository.save(newFuneral);
    }
    async findAll() {
        return this.funeralRepository.find();
    }
    async findAllByUser(userId) {
        return this.funeralRepository.find({ where: { user: { id: userId } } });
    }
    async findOne(id) {
        const funeral = await this.funeralRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!funeral) {
            throw new common_1.NotFoundException(`Funeral with id ${id} not found`);
        }
        return funeral;
    }
    async update(id, data) {
        console.log(`Actualizando funeral con ID ${id}...`);
        try {
            console.log('es esto', data.church_time);
            const funeralExistente = await this.funeralRepository.findOne({
                where: { id: id },
            });
            if (!funeralExistente) {
                throw new common_1.NotFoundException(`Funeral con ID ${id} no encontrado`);
            }
            const funeralActualizado = await this.funeralRepository.save({
                ...funeralExistente,
                ...data,
            });
            return funeralActualizado;
        }
        catch (error) {
            console.error(`Error al actualizar funeral: ${error.message}`);
            throw error;
        }
    }
    async remove(id) {
        const funeral = await this.findOne(id);
        return this.funeralRepository.remove(funeral);
    }
    async removeAll() {
        return this.funeralRepository.delete({});
    }
    async removeAllByUser(userId) {
        const result = await this.funeralRepository.delete({
            user: { id: userId },
        });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`No funerals found for user with id ${userId}`);
        }
        return result;
    }
    async getStoreProductsForFuneral(funeralUserId) {
        try {
            const funeralUser = await this.userRepository.findOne({
                where: { id: funeralUserId },
                relations: ['esquela'],
            });
            if (!funeralUser.esquela || funeralUser.esquela.length === 0) {
                throw new common_1.NotFoundException('No se encontraron esquelas asociadas al usuario tanatorio.');
            }
            const storeProductsPromises = funeralUser.esquela.map(async (esquela) => {
                const store = await this.storeRepository.findOne({
                    where: { usuario: { id: esquela.id } },
                    relations: ['cat'],
                });
                return store ? store.cat : [];
            });
            const storeProducts = await Promise.all(storeProductsPromises);
            return storeProducts.reduce((accumulator, currentProducts) => accumulator.concat(currentProducts), []);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Error al obtener los productos para el usuario tanatorio: ${error.message}`);
        }
    }
};
exports.FuneralService = FuneralService;
exports.FuneralService = FuneralService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(funeral_entity_1.Funeral)),
    __param(1, (0, typeorm_1.InjectRepository)(user_type_entity_1.Usuario)),
    __param(2, (0, typeorm_1.InjectRepository)(store_florist_entity_1.StoreFlorist)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FuneralService);
//# sourceMappingURL=funeral.service.js.map