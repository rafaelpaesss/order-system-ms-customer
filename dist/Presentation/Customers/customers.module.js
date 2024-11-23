"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersModule = void 0;
const common_1 = require("@nestjs/common");
const cognito_service_1 = require("../../Infrastructure/Apis/cognito.service");
const customer_service_1 = require("../../Application/services/customer.service");
const customers_adapter_1 = require("../../Domain/Adapters/customers.adapter");
const customersRepository_1 = require("../../Domain/Repositories/customersRepository");
const prisma_service_1 = require("../../Infrastructure/Apis/prisma.service");
const customers_controller_1 = require("./customers.controller");
let CustomersModule = class CustomersModule {
};
exports.CustomersModule = CustomersModule;
exports.CustomersModule = CustomersModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [customers_controller_1.CustomersController],
        providers: [
            { provide: customersRepository_1.CustomersRepository, useClass: customers_adapter_1.CustomersAdapter },
            prisma_service_1.PrismaService,
            cognito_service_1.AwsCognitoService,
            customer_service_1.CustomerService,
        ],
        exports: [customer_service_1.CustomerService],
    })
], CustomersModule);
//# sourceMappingURL=customers.module.js.map