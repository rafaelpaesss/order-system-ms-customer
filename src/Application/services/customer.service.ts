import { CustomersRepository } from '@Repositories/customers.repository';

export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async getById(id: number): Promise<Customer | null> {
    return this.customersRepository.getCustomerById(id);
  }

  async save(customer: Customer): Promise<Customer> {
    return this.customersRepository.saveCustomer(customer);
  }

  async update(id: number, updatedCustomer: Customer): Promise<Customer> {
    return this.customersRepository.updateCustomer(id, updatedCustomer);
  }

  async delete(id: number): Promise<void> {
    return this.customersRepository.deleteCustomerById(id);
  }
}
