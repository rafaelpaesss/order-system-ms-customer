import { Customers } from '../Interfaces/customer';
export declare abstract class CustomersRepository {
    abstract getCustomerByCpf(cpf: string, password: string): Promise<Customers | null>;
    abstract saveCustomer(customer: Customers): Promise<Customers>;
}
