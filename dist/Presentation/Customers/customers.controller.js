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
exports.CustomersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const customer_service_1 = require("../../Application/services/customer.service");
const customers_dto_1 = require("./dtos/customers.dto");
let CustomersController = class CustomersController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    async getByCpf(cpf, password) {
        try {
            const customer = await this.customerService.getByCpf(cpf, password);
            return customer;
        }
        catch (err) {
            throw new common_1.NotFoundException(err?.message ?? 'Customer could not be found');
        }
    }
    async save(dto) {
        try {
            const customer = await this.customerService.create(dto);
            return customer;
        }
        catch (err) {
            throw new common_1.NotFoundException(err?.message ?? 'Customer could not be created');
        }
    }
};
exports.CustomersController = CustomersController;
__decorate([
    (0, common_1.Get)(':cpf'),
    __param(0, (0, common_1.Param)('cpf')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "getByCpf", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customers_dto_1.CustomersDto]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "save", null);
exports.CustomersController = CustomersController = __decorate([
    (0, swagger_1.ApiTags)('Clientes'),
    (0, common_1.Controller)('customers'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomersController);
//# sourceMappingURL=customers.controller.js.map