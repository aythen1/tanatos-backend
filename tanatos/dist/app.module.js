"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const funeral_module_1 = require("./funeral/funeral.module");
const order_module_1 = require("./order/order.module");
const user_type_module_1 = require("./user-type/user-type.module");
const store_florist_module_1 = require("./store-florist/store-florist.module");
const cat_module_1 = require("./cat/cat.module");
const pay_pal_module_1 = require("./pay-pal/pay-pal.module");
const order_entity_1 = require("./order/entities/order.entity");
const funeral_entity_1 = require("./funeral/entities/funeral.entity");
const cat_entity_1 = require("./cat/entities/cat.entity");
const store_florist_entity_1 = require("./store-florist/entities/store-florist.entity");
const pay_pal_entity_1 = require("./pay-pal/entities/pay-pal.entity");
const user_type_entity_1 = require("./user-type/entities/user-type.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.HOST,
                port: parseInt(process.env.PORT),
                username: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DATABASE,
                entities: [order_entity_1.Order, funeral_entity_1.Funeral, cat_entity_1.Cat, store_florist_entity_1.StoreFlorist, user_type_entity_1.Usuario, pay_pal_entity_1.PayPal],
                synchronize: true,
            }),
            funeral_module_1.FuneralModule,
            order_module_1.OrderModule,
            user_type_module_1.UserTypeModule,
            store_florist_module_1.StoreFloristModule,
            cat_module_1.CatModule,
            pay_pal_module_1.PayPalModule,
        ],
        controllers: [],
        providers: [],
        exports: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map