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
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_type_entity_1 = require("../entities/user-type.entity");
const bcrypt = require("bcrypt");
const funeral_entity_1 = require("../../funeral/entities/funeral.entity");
let UsuarioService = class UsuarioService {
    constructor(usuarioRepository, funeralRepository) {
        this.usuarioRepository = usuarioRepository;
        this.funeralRepository = funeralRepository;
    }
    async findOneWithStore(id) {
        console.log(`Buscando usuario con ID ${id} y su tienda...`);
        try {
            return await this.usuarioRepository
                .createQueryBuilder('usuario')
                .leftJoinAndSelect('usuario.store', 'store')
                .leftJoinAndSelect('store.cat', 'cat')
                .where('usuario.id = :id', { id })
                .getOneOrFail();
        }
        catch (error) {
            console.error(`Error al buscar usuario con tienda: ${error.message}`);
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
    }
    async create(createUsuarioDto) {
        try {
            const usuario = this.usuarioRepository.create(createUsuarioDto);
            return await this.usuarioRepository.save(usuario);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Error al crear usuario: ${error.message}`);
        }
    }
    async findAll() {
        console.log('Buscando todos los usuarios...');
        try {
            return await this.usuarioRepository.find();
        }
        catch (error) {
            console.error(`Error al buscar usuarios: ${error.message}`);
            throw error;
        }
    }
    async findOne(id) {
        console.log(`Buscando usuario con ID ${id}...`);
        try {
            const userId = typeof id === 'string' ? parseInt(id, 10) : id;
            const usuario = await this.usuarioRepository.findOne({
                where: { id: userId },
            });
            if (!usuario) {
                throw new common_1.NotFoundException(`Usuario con ID ${userId} no encontrado`);
            }
            return usuario;
        }
        catch (error) {
            console.error(`Error al buscar usuario: ${error.message}`);
            throw error;
        }
    }
    async findStoreByUserId(id) {
        console.log(`Buscando tienda para el usuario con ID ${id}...`);
        const usuarioId = parseInt(id, 10);
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioId },
            relations: ['store'],
        });
        if (!usuario) {
            throw new common_1.NotFoundException(`Order with id ${id} not found`);
        }
        return usuario;
    }
    async update(id, usuario) {
        console.log(`Actualizando usuario con ID ${id}...`);
        try {
            const usuarioExistente = await this.findOne(id);
            if (!usuarioExistente) {
                throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
            }
            const usuarioActualizado = await this.usuarioRepository.save({
                ...usuarioExistente,
                ...usuario,
            });
            return usuarioActualizado;
        }
        catch (error) {
            console.error(`Error al actualizar usuario: ${error.message}`);
            throw error;
        }
    }
    async remove(id) {
        console.log(`Eliminando usuario con ID ${id}...`);
        try {
            const usuario = await this.findOne(id);
            await this.usuarioRepository.remove(usuario);
        }
        catch (error) {
            console.error(`Error al eliminar usuario: ${error.message}`);
            throw error;
        }
    }
    async findOneByEmail(email) {
        console.log('Buscando usuario por email...');
        console.log(`Buscando usuario con email ${email}...`);
        try {
            const usuario = await this.usuarioRepository.findOne({
                where: { email },
            });
            console.log('Usuario encontrado:', usuario);
            return usuario;
        }
        catch (error) {
            console.error(`Error al buscar usuario por email: ${error.message}`);
            throw error;
        }
    }
    async updatePassword(id, newPassword) {
        console.log(`Actualizando contraseña para el usuario con ID ${id}...`);
        try {
            const usuario = await this.findOne(id);
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            usuario.password = hashedPassword;
            return await this.usuarioRepository.save(usuario);
        }
        catch (error) {
            console.error(`Error al actualizar la contraseña: ${error.message}`);
            throw error;
        }
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_type_entity_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(funeral_entity_1.Funeral)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsuarioService);
//# sourceMappingURL=user-type.service.js.map