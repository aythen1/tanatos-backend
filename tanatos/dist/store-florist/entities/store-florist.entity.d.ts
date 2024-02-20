import { Usuario } from '../../user-type/entities/user-type.entity';
import { Order } from 'src/order/entities/order.entity';
import { Cat } from 'src/cat/entities/cat.entity';
export declare class StoreFlorist {
    id: number;
    phone: string;
    location: string;
    lat: number;
    lng: number;
    name: string;
    clients: Usuario[];
    orders: Order[];
    usuario: Usuario;
    cat: Cat[];
}
