"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreFloristModule = void 0;
const common_1 = require("@nestjs/common");
const store_florist_service_1 = require("./service/store-florist.service");
const store_florist_controller_1 = require("./controller/store-florist.controller");
const typeorm_1 = require("@nestjs/typeorm");
const store_florist_entity_1 = require("./entities/store-florist.entity");
const user_type_entity_1 = require("../user-type/entities/user-type.entity");
let StoreFloristModule = class StoreFloristModule {
};
exports.StoreFloristModule = StoreFloristModule;
exports.StoreFloristModule = StoreFloristModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([store_florist_entity_1.StoreFlorist, user_type_entity_1.Usuario]),
        ],
        controllers: [store_florist_controller_1.StoreFloristController],
        providers: [store_florist_service_1.StoreFloristService],
    })
], StoreFloristModule);
//# sourceMappingURL=store-florist.module.js.map