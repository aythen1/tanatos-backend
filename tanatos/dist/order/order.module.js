"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_service_1 = require("./service/order.service");
const order_controller_1 = require("./controller/order.controller");
const store_florist_entity_1 = require("../store-florist/entities/store-florist.entity");
const store_florist_module_1 = require("../store-florist/store-florist.module");
const funeral_entity_1 = require("../funeral/entities/funeral.entity");
const user_type_entity_1 = require("../user-type/entities/user-type.entity");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order, store_florist_entity_1.StoreFlorist, funeral_entity_1.Funeral, user_type_entity_1.Usuario]),
            store_florist_module_1.StoreFloristModule,
            funeral_entity_1.Funeral,
        ],
        providers: [order_service_1.OrderService],
        controllers: [order_controller_1.OrderController],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map