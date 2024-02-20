"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTypeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_type_entity_1 = require("./entities/user-type.entity");
const user_type_service_1 = require("./service/user-type.service");
const user_type_controller_1 = require("./controller/user-type.controller");
const funeral_entity_1 = require("../funeral/entities/funeral.entity");
let UserTypeModule = class UserTypeModule {
};
exports.UserTypeModule = UserTypeModule;
exports.UserTypeModule = UserTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_type_entity_1.Usuario, funeral_entity_1.Funeral]), funeral_entity_1.Funeral],
        controllers: [user_type_controller_1.UsuarioController],
        providers: [user_type_service_1.UsuarioService],
    })
], UserTypeModule);
//# sourceMappingURL=user-type.module.js.map