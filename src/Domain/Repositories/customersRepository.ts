import { Customer } from '../Interfaces/customer';

export abstract class CustomersRepository {
  abstract getCustomerByCpf(cpf: string): Promise<Customer | null>;
  abstract saveCustomer(customer: Customer): Promise<Customer>;
  abstract updateCustomer(customer: Customer): Promise<Customer>;
  abstract deleteCustomerByCpf(cpf: string): Promise<Customer>;
}
