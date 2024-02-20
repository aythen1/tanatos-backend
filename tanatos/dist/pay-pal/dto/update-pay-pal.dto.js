"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePayPalDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_pay_pal_dto_1 = require("./create-pay-pal.dto");
class UpdatePayPalDto extends (0, mapped_types_1.PartialType)(create_pay_pal_dto_1.CreatePayPalDto) {
}
exports.UpdatePayPalDto = UpdatePayPalDto;
//# sourceMappingURL=update-pay-pal.dto.js.map