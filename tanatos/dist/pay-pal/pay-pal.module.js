"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayPalModule = void 0;
const common_1 = require("@nestjs/common");
const pay_pal_service_1 = require("./service/pay-pal.service");
const pay_pal_order_controller_1 = require("./controller/pay-pal-order.controller");
const order_entity_1 = require("../order/entities/order.entity");
const typeorm_1 = require("@nestjs/typeorm");
let PayPalModule = class PayPalModule {
};
exports.PayPalModule = PayPalModule;
exports.PayPalModule = PayPalModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order])],
        controllers: [pay_pal_order_controller_1.PayPalController],
        providers: [pay_pal_service_1.PayPalService],
    })
], PayPalModule);
//# sourceMappingURL=pay-pal.module.js.map