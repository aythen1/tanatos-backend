import { Funeral } from 'src/funeral/entities/funeral.entity';
import { StoreFlorist } from 'src/store-florist/entities/store-florist.entity';
import { Usuario } from 'src/user-type/entities/user-type.entity';
export declare class Order {
    id: number;
    name: string;
    location: string;
    phone: string;
    items: any[];
    total_amount: number;
    address: string;
    sympathy_text: string;
    status: string;
    paypal_order_id: string;
    payment_status: string;
    cliente: Usuario;
    store: StoreFlorist;
    esquela: Funeral;
}
