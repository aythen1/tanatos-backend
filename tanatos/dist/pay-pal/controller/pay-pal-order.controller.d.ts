import { PayPalService } from '../service/pay-pal.service';
export declare class PayPalController {
    private readonly payPalService;
    constructor(payPalService: PayPalService);
    intentPay(orderId: number, storeName: string, totalAmount: number): Promise<any>;
    captureOrder(token: string): Promise<any>;
    canceledOrder(orderId: number): string;
}
