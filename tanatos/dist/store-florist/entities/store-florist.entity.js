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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreFlorist = void 0;
const typeorm_1 = require("typeorm");
const user_type_entity_1 = require("../../user-type/entities/user-type.entity");
const order_entity_1 = require("../../order/entities/order.entity");
const cat_entity_1 = require("../../cat/entities/cat.entity");
let StoreFlorist = class StoreFlorist {
};
exports.StoreFlorist = StoreFlorist;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StoreFlorist.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StoreFlorist.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StoreFlorist.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 6 }),
    __metadata("design:type", Number)
], StoreFlorist.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 6 }),
    __metadata("design:type", Number)
], StoreFlorist.prototype, "lng", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StoreFlorist.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_type_entity_1.Usuario),
    (0, typeorm_1.JoinTable)({
        name: 'store_florist_clients',
        joinColumn: { name: 'store_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'client_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], StoreFlorist.prototype, "clients", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (order) => order.store),
    __metadata("design:type", Array)
], StoreFlorist.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_type_entity_1.Usuario, (usuario) => usuario.store),
    (0, typeorm_1.JoinColumn)({ name: 'usuarioId' }),
    __metadata("design:type", user_type_entity_1.Usuario)
], StoreFlorist.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cat_entity_1.Cat, (cat) => cat.store),
    (0, typeorm_1.JoinColumn)({ name: 'cat' }),
    __metadata("design:type", Array)
], StoreFlorist.prototype, "cat", void 0);
exports.StoreFlorist = StoreFlorist = __decorate([
    (0, typeorm_1.Entity)()
], StoreFlorist);
//# sourceMappingURL=store-florist.entity.js.map