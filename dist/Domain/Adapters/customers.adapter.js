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
exports.CustomersAdapter = void 0;
const common_1 = require("@nestjs/common");
const cognito_service_1 = require("../../Infrastructure/Apis/cognito.service");
const prisma_service_1 = require("../../Infrastructure/Apis/prisma.service");
let CustomersAdapter = class CustomersAdapter {
    constructor(prisma, cognito) {
        this.prisma = prisma;
        this.cognito = cognito;
    }
    async getCustomerByCpf(cpf, password) {
        try {
            if (!cpf || cpf.length !== 11) {
                throw new Error('CPF inválido');
            }
            const customer = await this.prisma.customer.findUnique({
                where: { cpf: cpf },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    cpf: true,
                    isAdmin: true,
                    password: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            if (!customer) {
                throw new Error('Cliente não encontrado');
            }
            if (customer.password !== password) {
                throw new Error('Senha inválida');
            }
            return customer;
        }
        catch (error) {
            const message = error?.message || error?.meta?.target || error?.meta?.details;
            throw new Error(message);
        }
    }
    async saveCustomer(customer) {
        try {
            if (!customer.cpf || customer.cpf.length !== 11) {
                throw new Error('CPF inválido');
            }
            if (!customer.password) {
                throw new Error('Senha é obrigatória');
            }
            const newCustomer = await this.prisma.customer.create({
                data: {
                    name: customer.name,
                    email: customer.email,
                    cpf: customer.cpf,
                    isAdmin: customer.isAdmin,
                    password: customer.password,
                },
            });
            return newCustomer;
        }
        catch (error) {
            const message = error?.message || error?.meta?.target || error?.meta?.details;
            throw new Error(message);
        }
    }
};
exports.CustomersAdapter = CustomersAdapter;
exports.CustomersAdapter = CustomersAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cognito_service_1.AwsCognitoService])
], CustomersAdapter);
//# sourceMappingURL=customers.adapter.js.map