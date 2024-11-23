import { CustomersRepository } from 'src/Domain/Repositories/customersRepository';
import { Customers } from 'src/Domain/Interfaces/customer';
import { CustomersDto } from 'src/Presentation/Customers/dtos/customers.dto';
export declare class CustomerService {
    private readonly customersRepository;
    constructor(customersRepository: CustomersRepository);
    getByCpf(cpf: string, password: string): Promise<Customers | null>;
    create(dto: CustomersDto): Promise<Customers>;
}
