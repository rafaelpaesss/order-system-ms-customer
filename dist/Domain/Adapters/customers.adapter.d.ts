import { AwsCognitoService } from 'src/Infrastructure/Apis/cognito.service';
import { PrismaService } from '../../Infrastructure/Apis/prisma.service';
import { Customers } from '../Interfaces/customer';
import { CustomersRepository } from '../Repositories/customersRepository';
export declare class CustomersAdapter implements CustomersRepository {
    private readonly prisma;
    private readonly cognito;
    constructor(prisma: PrismaService, cognito: AwsCognitoService);
    getCustomerByCpf(cpf: string, password: string): Promise<Customers | null>;
    saveCustomer(customer: Customers): Promise<Customers>;
}
