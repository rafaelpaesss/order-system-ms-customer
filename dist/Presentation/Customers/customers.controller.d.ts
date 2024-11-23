import { CustomerService } from '../../Application/services/customer.service';
import { CustomersDto } from './dtos/customers.dto';
export declare class CustomersController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    getByCpf(cpf: string, password: string): Promise<import("../../Domain/Interfaces/customer").Customers | null>;
    save(dto: CustomersDto): Promise<import("../../Domain/Interfaces/customer").Customers>;
}
