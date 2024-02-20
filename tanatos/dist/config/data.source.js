"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appTanatosEmail = exports.HOST = exports.PAYPAL_API = exports.PAYPAL_API_CLIENT = exports.PAYPAL_API_SECRET = exports.AppDataSource = exports.DataSourceConfig = void 0;
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const config_1 = require("@nestjs/config");
config_1.ConfigModule.forRoot({
    envFilePath: '.env',
});
const configService = new config_1.ConfigService();
exports.DataSourceConfig = {
    type: 'postgres',
    host: configService.get('HOST'),
    port: +configService.get('PORT'),
    username: configService.get('USER'),
    password: configService.get('PASSWORD'),
    database: configService.get('DATABASE'),
    entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    synchronize: true,
    logging: false,
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
};
exports.AppDataSource = new typeorm_1.DataSource(exports.DataSourceConfig);
exports.PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;
exports.PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
exports.PAYPAL_API = process.env.PAYPAL_API;
exports.HOST = process.env.HOST;
exports.appTanatosEmail = process.env.appTanatosEmail;
//# sourceMappingURL=data.source.js.map