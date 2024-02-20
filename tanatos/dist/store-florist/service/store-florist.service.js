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
exports.StoreFloristService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const store_florist_entity_1 = require("../entities/store-florist.entity");
const user_type_entity_1 = require("../../user-type/entities/user-type.entity");
let StoreFloristService = class StoreFloristService {
    constructor(storeFloristRepository, usuarioRepository) {
        this.storeFloristRepository = storeFloristRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async create(createStoreFloristDTO, userId, name, location, lat, lng) {
        try {
            console.log('Comenzando creación de tienda florista...');
            const user = await this.usuarioRepository.findOne({
                where: { id: userId },
            });
            if (!user) {
                console.log(`El usuario con ID ${userId} no fue encontrado.`);
                throw new common_1.NotFoundException(`El usuario con ID ${userId} no fue encontrado.`);
            }
            const storeFlorist = new store_florist_entity_1.StoreFlorist();
            storeFlorist.phone = user.phone;
            storeFlorist.location = location;
            storeFlorist.lat = lat;
            storeFlorist.lng = lng;
            storeFlorist.name = name;
            storeFlorist.usuario = user;
            const createdStoreFlorist = await this.storeFloristRepository.save(storeFlorist);
            console.log('Tienda florista creada exitosamente.');
            return createdStoreFlorist;
        }
        catch (error) {
            console.error('Error al crear la tienda florista:', error.message);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Error al crear la tienda florista.');
            }
        }
    }
    async delete(id) {
        try {
            console.log(`Eliminando tienda florista con ID ${id}...`);
            const result = await this.storeFloristRepository.delete(id);
            if (result.affected === 0) {
                console.log(`La tienda florista con ID ${id} no existe.`);
                throw new common_1.NotFoundException(`La tienda florista con ID ${id} no existe.`);
            }
            console.log('Tienda florista eliminada exitosamente.');
        }
        catch (error) {
            console.error('Error al eliminar la tienda florista:', error.message);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Error al eliminar la tienda florista.');
            }
        }
    }
    async findByUserId(userId) {
        try {
            console.log(`Buscando tiendas floristas del usuario con ID ${userId}...`);
            const storeFlorists = await this.storeFloristRepository.find({
                where: { usuario: { id: userId } },
            });
            console.log(`Se encontraron ${storeFlorists.length} tiendas floristas.`);
            return storeFlorists;
        }
        catch (error) {
            console.error('Error al buscar las tiendas floristas del usuario:', error.message);
            throw new common_1.InternalServerErrorException('Error al buscar las tiendas floristas del usuario.');
        }
    }
    async findByName(name) {
        try {
            console.log(`Buscando tienda florista por nombre "${name}"...`);
            const storeFlorists = await this.storeFloristRepository.find({
                where: { name },
            });
            console.log(`Se encontraron ${storeFlorists.length} tiendas floristas con el nombre "${name}".`);
            return storeFlorists;
        }
        catch (error) {
            console.error('Error al buscar la tienda florista por nombre:', error.message);
            throw new common_1.InternalServerErrorException('Error al buscar la tienda florista por nombre.');
        }
    }
    async findCatsByStoreId(storeId) {
        try {
            console.log(`Buscando gatos asociados a la tienda con ID ${storeId}...`);
            const store = await this.storeFloristRepository.findOne({
                where: { id: storeId },
                relations: ['cat'],
            });
            if (!store) {
                throw new common_1.NotFoundException(`Tienda florista con ID ${storeId} no encontrada`);
            }
            const cats = store.cat;
            console.log(`Se encontraron ${cats.length} gatos asociados a la tienda.`);
            return cats;
        }
        catch (error) {
            console.error('Error al buscar gatos asociados a la tienda:', error.message);
            throw new common_1.InternalServerErrorException('Error al buscar gatos asociados a la tienda');
        }
    }
    async findAllWithCats() {
        try {
            console.log('Buscando todas las tiendas floristas con sus gatos asociados...');
            const cats = await this.storeFloristRepository.find({
                relations: ['cat'],
            });
            console.log('cats', cats);
            return cats;
        }
        catch (error) {
            console.error('Error al buscar todas las tiendas floristas con sus gatos asociados:', error.message);
            throw new common_1.InternalServerErrorException('Error al buscar todas las tiendas floristas con sus gatos asociados');
        }
    }
};
exports.StoreFloristService = StoreFloristService;
exports.StoreFloristService = StoreFloristService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(store_florist_entity_1.StoreFlorist)),
    __param(1, (0, typeorm_1.InjectRepository)(user_type_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StoreFloristService);
//# sourceMappingURL=store-florist.service.js.map