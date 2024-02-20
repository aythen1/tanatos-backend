import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order } from '../entities/order.entity';
import { StoreFlorist } from '../../store-florist/entities/store-florist.entity';
import { Funeral } from '../../funeral/entities/funeral.entity';
import { Usuario } from 'src/user-type/entities/user-type.entity';
export declare class OrderService {
    private readonly orderRepository;
    private readonly storeFloristRepository;
    private readonly funeralRepository;
    private readonly usuarioRepository;
    constructor(orderRepository: Repository<Order>, storeFloristRepository: Repository<StoreFlorist>, funeralRepository: Repository<Funeral>, usuarioRepository: Repository<Usuario>);
    create(createOrderDto: CreateOrderDto, store_id: number, esquela_id: number, client_id: number): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
    remove(id: string): Promise<void>;
    findByStatus(status: string): Promise<Order[]>;
    findOrdersByStoreId(storeId: number, status: string): Promise<Order[]>;
}
