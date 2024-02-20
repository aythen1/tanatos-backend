"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuneralModule = void 0;
const common_1 = require("@nestjs/common");
const funeral_service_1 = require("./service/funeral.service");
const funeral_controller_1 = require("./controller/funeral.controller");
const typeorm_1 = require("@nestjs/typeorm");
const funeral_entity_1 = require("./entities/funeral.entity");
const user_type_entity_1 = require("../user-type/entities/user-type.entity");
const store_florist_entity_1 = require("../store-florist/entities/store-florist.entity");
let FuneralModule = class FuneralModule {
};
exports.FuneralModule = FuneralModule;
exports.FuneralModule = FuneralModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([funeral_entity_1.Funeral, user_type_entity_1.Usuario, store_florist_entity_1.StoreFlorist]),
        ],
        controllers: [funeral_controller_1.FuneralController],
        providers: [funeral_service_1.FuneralService],
    })
], FuneralModule);
//# sourceMappingURL=funeral.module.js.map