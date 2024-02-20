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
exports.PayPalController = void 0;
const common_1 = require("@nestjs/common");
const pay_pal_service_1 = require("../service/pay-pal.service");
let PayPalController = class PayPalController {
    constructor(payPalService) {
        this.payPalService = payPalService;
    }
    async intentPay(orderId, storeName, totalAmount) {
        console.log('ENTRA');
        return this.payPalService.intentPay(orderId, storeName, totalAmount);
    }
    captureOrder(token) {
        return this.payPalService.captureOrder(token);
    }
    canceledOrder(orderId) {
        this.payPalService.canceledOrder(orderId);
        const htmlResponse = `
    <html>
      <head>
        <title>Cancelación de orden</title>
      </head>
      <body>
        <h1>Orden cancelada</h1>
        <p>La orden con ID ${orderId} ha sido cancelada.</p>
        <button onclick="closeWindow()">Cerrar ventana</button>
        <script>
          function closeWindow() {
            window.close(); // Cierra la ventana del navegador
          }
        </script>
      </body>
    </html>
  `;
        return htmlResponse;
    }
};
exports.PayPalController = PayPalController;
__decorate([
    (0, common_1.Post)('/create-orders'),
    __param(0, (0, common_1.Body)('orderId')),
    __param(1, (0, common_1.Body)('storeName')),
    __param(2, (0, common_1.Body)('totalAmount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number]),
    __metadata("design:returntype", Promise)
], PayPalController.prototype, "intentPay", null);
__decorate([
    (0, common_1.Get)('/capture-orders'),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayPalController.prototype, "captureOrder", null);
__decorate([
    (0, common_1.Get)('/cancel-orders/:orderId'),
    __param(0, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PayPalController.prototype, "canceledOrder", null);
exports.PayPalController = PayPalController = __decorate([
    (0, common_1.Controller)('pay-pal-order'),
    __metadata("design:paramtypes", [pay_pal_service_1.PayPalService])
], PayPalController);
//# sourceMappingURL=pay-pal-order.controller.js.map