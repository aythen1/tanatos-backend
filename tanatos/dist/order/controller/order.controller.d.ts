import { OrderService } from '../service/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto, store_id: number, esquela_id: number, client_id: number): Promise<import("../entities/order.entity").Order>;
    findAll(): Promise<import("../entities/order.entity").Order[]>;
    findOne(id: string): Promise<import("../entities/order.entity").Order>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<import("../entities/order.entity").Order>;
    remove(id: string): Promise<void>;
    findByStatus(status: string): Promise<import("../entities/order.entity").Order[]>;
    findOrdersByStoreId(storeId: number, status: string): Promise<import("../entities/order.entity").Order[]>;
}
