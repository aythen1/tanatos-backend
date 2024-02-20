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
exports.PayPalService = void 0;
const common_1 = require("@nestjs/common");
const data_source_1 = require("../../config/data.source");
const axios_1 = require("axios");
const url_1 = require("url");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("../../order/entities/order.entity");
const typeorm_2 = require("typeorm");
let PayPalService = class PayPalService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async intentPay(orderId, storeName, totalAmount) {
        try {
            const ord = await this.orderRepository.findOne({
                where: { id: orderId },
                relations: [
                    'store',
                    'store.usuario',
                    'cliente',
                    'esquela',
                    'esquela.user',
                ],
            });
            console.log(ord, 'esto es ord');
            const floristeriaAmount = totalAmount * 0.7;
            const tanatorioAmount = totalAmount * 0.15;
            const appTanatosAmount = totalAmount * 0.15;
            const order = {
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value: totalAmount.toFixed(2),
                            breakdown: {
                                item_total: {
                                    currency_code: 'USD',
                                    value: totalAmount.toFixed(2),
                                },
                            },
                        },
                        payees: [
                            {
                                email_address: 'sb-nkvso29618640@personal.example.com',
                                amount: {
                                    currency_code: 'USD',
                                    value: floristeriaAmount.toFixed(2),
                                },
                            },
                            {
                                email_address: 'sb-flm0g29608509@business.example.com',
                                amount: {
                                    currency_code: 'USD',
                                    value: tanatorioAmount.toFixed(2),
                                },
                            },
                            {
                                email_address: 'sb-xwimt29130867@business.example.com',
                                amount: {
                                    currency_code: 'USD',
                                    value: appTanatosAmount.toFixed(2),
                                },
                            },
                        ],
                        description: `Pago dividido entre la floristería, el tanatorio y la aplicación de ${storeName}`,
                    },
                ],
                application_context: {
                    brand_name: storeName,
                    landing_page: 'NO_PREFERENCE',
                    user_action: 'PAY_NOW',
                    return_url: `http://192.168.0.236:3000/pay-pal-order/capture-orders`,
                    cancel_url: `http://192.168.0.236:3000/pay-pal-order/cancel-orders`,
                },
            };
            const params = new url_1.URLSearchParams();
            params.append('grant_type', 'client_credentials');
            const { data: { access_token }, } = await axios_1.default.post(`${data_source_1.PAYPAL_API}/v1/oauth2/token`, params, {
                auth: {
                    username: data_source_1.PAYPAL_API_CLIENT,
                    password: data_source_1.PAYPAL_API_SECRET,
                },
            });
            console.log('esto es paypal id', access_token);
            const response = await axios_1.default.post(`${data_source_1.PAYPAL_API}/v2/checkout/orders`, order, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        }
        catch (error) {
            console.log(error);
            throw new common_1.NotFoundException('Error al iniciar el proceso de pago');
        }
    }
    async captureOrder(token) {
        try {
            const response = await axios_1.default.post(`${data_source_1.PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
                auth: {
                    username: data_source_1.PAYPAL_API_CLIENT,
                    password: data_source_1.PAYPAL_API_SECRET,
                },
            });
            console.log(response.data);
            return 'payed';
        }
        catch (error) {
            console.error('Error al capturar la orden de PayPal:', error.message);
            throw new Error('Error al capturar la orden de PayPal');
        }
    }
    async canceledOrder(orderId) {
        try {
            const order = await this.orderRepository.findOne({
                where: { id: orderId },
            });
            if (!order) {
                throw new common_1.NotFoundException(`No se encontró la orden con ID ${orderId}`);
            }
            await this.orderRepository.delete(orderId);
            console.log(`Orden con ID ${orderId} eliminada exitosamente.`);
        }
        catch (error) {
            console.error('Error al cancelar la orden:', error.message);
            throw new Error('Error al cancelar la orden');
        }
    }
};
exports.PayPalService = PayPalService;
exports.PayPalService = PayPalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PayPalService);
//# sourceMappingURL=pay-pal.service.js.map