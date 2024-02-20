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
exports.UpdateUsuarioDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_type_dto_1 = require("./create-user-type.dto");
const class_validator_1 = require("class-validator");
class UpdateUsuarioDto extends (0, mapped_types_1.PartialType)(create_user_type_dto_1.CreateUsuarioDto) {
}
exports.UpdateUsuarioDto = UpdateUsuarioDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Name should be a string' }),
    (0, class_validator_1.MaxLength)(30, { message: 'Name should be at most 30 characters long' }),
    __metadata("design:type", String)
], UpdateUsuarioDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Password should be a string' }),
    (0, class_validator_1.MaxLength)(25, { message: 'Password should be at most 25 characters long' }),
    __metadata("design:type", String)
], UpdateUsuarioDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Email should be a string' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Email should be at most 50 characters long' }),
    __metadata("design:type", String)
], UpdateUsuarioDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Phone should be a string' }),
    (0, class_validator_1.MaxLength)(20, { message: 'Phone should be at most 20 characters long' }),
    __metadata("design:type", String)
], UpdateUsuarioDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Phone number should be a string' }),
    (0, class_validator_1.MaxLength)(20, {
        message: 'Phone number should be at most 20 characters long',
    }),
    __metadata("design:type", String)
], UpdateUsuarioDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Token should be a string' }),
    (0, class_validator_1.MaxLength)(20, { message: 'Token should be at most 20 characters long' }),
    __metadata("design:type", String)
], UpdateUsuarioDto.prototype, "token", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'City should be a string' }),
    (0, class_validator_1.MaxLength)(25, { message: 'City should be at most 25 characters long' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUsuarioDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Country should be a string' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Country should be at most 50 characters long' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUsuarioDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUsuarioDto.prototype, "old_password", void 0);
//# sourceMappingURL=update-user-type.dto.js.map