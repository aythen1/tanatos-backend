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
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const user_type_service_1 = require("../service/user-type.service");
const create_user_type_dto_1 = require("../dto/create-user-type.dto");
const update_user_type_dto_1 = require("../dto/update-user-type.dto");
const bcrypt = require("bcrypt");
const platform_express_1 = require("@nestjs/platform-express");
const upload_1 = require("../upload");
const multer_1 = require("multer");
const path_1 = require("path");
let UsuarioController = class UsuarioController {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    async getUserStoreProducts(id) {
        console.log(`Buscando productos de la tienda para el usuario con ID ${id}...`);
        const user = await this.usuarioService.findOneWithStore(id);
        if (!user) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return user.store;
    }
    async create(createUsuarioDto) {
        try {
            const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 10);
            createUsuarioDto.password = hashedPassword;
            const usuario = await this.usuarioService.create(createUsuarioDto);
            return usuario;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error al crear usuario: ${error.message}`);
        }
    }
    async findAll() {
        console.log('Buscando todos los usuarios...');
        return this.usuarioService.findAll();
    }
    async findOne(id) {
        console.log(`Buscando usuario con ID ${id}...`);
        return this.usuarioService.findOne(id);
    }
    async update(id, updateUsuarioDto) {
        console.log(`Actualizando usuario con ID ${id}...`);
        const usuario = await this.usuarioService.findOne(id);
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        Object.assign(usuario, updateUsuarioDto);
        return this.usuarioService.update(id, usuario);
    }
    async remove(id) {
        console.log(`Eliminando usuario con ID ${id}...`);
        return this.usuarioService.remove(id);
    }
    async findOneByEmail(body) {
        const { email } = body;
        console.log(`Buscando usuario con email ${email}...`);
        if (!email) {
            throw new common_1.BadRequestException('El campo email es requerido');
        }
        return this.usuarioService.findOneByEmail(email);
    }
    async uploadFile(file, id) {
        console.log(file);
        const photoUrl = await (0, upload_1.default)(file.path);
        console.log(`Actualizando usuario con ID ${id}...`);
        console.log(photoUrl, 'esta seria la url');
        const usuario = await this.usuarioService.findOne(id);
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        usuario.photo = photoUrl;
        return this.usuarioService.update(id, usuario);
    }
    async login(credentials) {
        const { email, password } = credentials;
        console.log('Iniciando sesión...');
        console.log('Email y contraseña recibidos:', email, password);
        try {
            console.log(`Buscando usuario con email: ${email}...`);
            const user = await this.usuarioService.findOneByEmail(email);
            if (!user) {
                console.log(`El usuario con email ${email} no fue encontrado.`);
                throw new common_1.NotFoundException('User not found');
            }
            console.log(`Verificando contraseña para el usuario con email: ${email}...`);
            console.log('Usuario encontrado:', user);
            console.log('Contraseña recibida:', password);
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log('Contraseña almacenada en la base de datos:', user.password);
            console.log('¿La contraseña es válida?', isPasswordValid);
            if (!isPasswordValid) {
                console.log(`Contraseña incorrecta para el usuario con email: ${email}.`);
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            console.log(`Inicio de sesión exitoso para el usuario con email: ${email}.`);
            const { id, username, email: userEmail, user_type } = user;
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Login successful',
                data: {
                    id,
                    username,
                    email: userEmail,
                    user_type,
                },
            };
        }
        catch (error) {
            console.error('Error al iniciar sesión:', error);
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.UnauthorizedException) {
                return {
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Invalid credentials',
                };
            }
            else {
                return {
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Internal server error',
                };
            }
        }
    }
    async updatePassword(id, new_password, old_password) {
        console.log(`Actualizando contraseña para el usuario con ID ${id}...`);
        try {
            console.log('entra');
            const user = await this.usuarioService.findOne(id);
            if (!user) {
                throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
            }
            const isOldPasswordValid = await bcrypt.compare(old_password, user.password);
            if (!isOldPasswordValid) {
                throw new common_1.BadRequestException('La contraseña antigua es incorrecta');
            }
            console.log('sigue');
            const hashedNewPassword = await bcrypt.hash(new_password, 10);
            user.old_password = old_password;
            user.password = hashedNewPassword;
            await this.usuarioService.update(id, user);
            console.log('a ver');
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Contraseña actualizada correctamente',
                data: user,
            };
        }
        catch (error) {
            console.log('problema ');
            console.error('Error al actualizar la contraseña:', error);
            return {
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error al actualizar la contraseña',
            };
        }
    }
    async findStoreByUserId(id) {
        console.log(`Buscando tienda para el usuario con ID ${id}...`);
        const store = await this.usuarioService.findStoreByUserId(id);
        if (!store) {
            throw new common_1.NotFoundException(`User with ID ${id} does not have a store.`);
        }
        return store;
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, common_1.Get)(':id/products'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "getUserStoreProducts", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_type_dto_1.CreateUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_type_dto_1.UpdateUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('by-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "findOneByEmail", null);
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
], UsuarioController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "login", null);
__decorate([
    (0, common_1.Patch)(':id/update-password'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('newPassword')),
    __param(2, (0, common_1.Body)('oldPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Get)('store/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "findStoreByUserId", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, common_1.Controller)('usuarios'),
    __metadata("design:paramtypes", [user_type_service_1.UsuarioService])
], UsuarioController);
//# sourceMappingURL=user-type.controller.js.map