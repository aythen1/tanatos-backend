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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../entities/order.entity");
const store_florist_entity_1 = require("../../store-florist/entities/store-florist.entity");
const funeral_entity_1 = require("../../funeral/entities/funeral.entity");
const user_type_entity_1 = require("../../user-type/entities/user-type.entity");
let OrderService = class OrderService {
    constructor(orderRepository, storeFloristRepository, funeralRepository, usuarioRepository) {
        this.orderRepository = orderRepository;
        this.storeFloristRepository = storeFloristRepository;
        this.funeralRepository = funeralRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async create(createOrderDto, store_id, esquela_id, client_id) {
        const store = await this.storeFloristRepository.findOne({
            where: { id: store_id },
        });
        const esquela = await this.funeralRepository.findOne({
            where: { id: esquela_id },
        });
        const cliente = await this.usuarioRepository.findOne({
            where: { id: client_id },
        });
        if (!store) {
            throw new common_1.NotFoundException(`No se encontró ninguna tienda con el ID ${store_id}`);
        }
        if (!esquela) {
            throw new common_1.NotFoundException(`No se encontró ninguna esquela con el ID ${esquela_id}`);
        }
        const order = this.orderRepository.create({
            ...createOrderDto,
            store,
            esquela,
            cliente,
        });
        return await this.orderRepository.save(order);
    }
    async findAll() {
        return await this.orderRepository.find();
    }
    async findOne(id) {
        const orderId = parseInt(id, 10);
        const order = await this.orderRepository.findOne({
            where: { id: orderId },
            relations: ['esquela', 'store', 'cliente'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`No se encontró ningún pedido con el ID ${id}`);
        }
        return order;
    }
    async update(id, updateOrderDto) {
        const order = await this.findOne(id);
        order.status = updateOrderDto.status || order.status;
        return await this.orderRepository.save(order);
    }
    async remove(id) {
        const order = await this.findOne(id);
        await this.orderRepository.remove(order);
    }
    async findByStatus(status) {
        return await this.orderRepository.find({ where: { status } });
    }
    async findOrdersByStoreId(storeId, status) {
        let orders;
        if (status) {
            orders = await this.orderRepository.find({
                where: { store: { id: storeId }, status: status },
                relations: ['store', 'esquela', 'cliente'],
            });
        }
        else {
            orders = await this.orderRepository.find({
                where: { store: { id: storeId } },
                relations: ['store', 'esquela', 'cliente'],
            });
        }
        if (!orders || orders.length === 0) {
            throw new common_1.NotFoundException(`No se encontraron pedidos para la tienda con ID ${storeId}`);
        }
        return orders;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(store_florist_entity_1.StoreFlorist)),
    __param(2, (0, typeorm_1.InjectRepository)(funeral_entity_1.Funeral)),
    __param(3, (0, typeorm_1.InjectRepository)(user_type_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map