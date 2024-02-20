import { OrderStatus } from './order-status.enum';
export declare class CreateOrderDto {
    readonly name: string;
    readonly location: string;
    readonly phone: string;
    readonly items: any[];
    readonly total_amount: number;
    readonly address: string;
    readonly sympathy_text: string;
    readonly status?: OrderStatus;
    cliente_id: number;
    store_id: number;
    esquela_id: number;
    readonly paypal_order_id: string;
    readonly payment_status: string;
}
