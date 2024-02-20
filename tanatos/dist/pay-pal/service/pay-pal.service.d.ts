import { Order } from '../../order/entities/order.entity';
import { Repository } from 'typeorm';
export declare class PayPalService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<Order>);
    intentPay(orderId: number, storeName: string, totalAmount: number): Promise<any>;
    captureOrder(token: string): Promise<any>;
    canceledOrder(orderId: number): Promise<void>;
}
