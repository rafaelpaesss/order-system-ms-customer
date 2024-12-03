import { Injectable } from '@nestjs/common';
import { Customers } from '../../Domain/Interfaces/customers';
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';

@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async getById(id: number): Promise<Customers | null> {
    return this.customersRepository.getCustomerById(id);
  }

  async create(customers: Customers): Promise<Customers> {
    return this.customersRepository.saveCustomer(customers);
  }

  async update(customers: Customers): Promise<Customers> {
    return this.customersRepository.updateCustomer(customers);
  }

  async delete(id: number): Promise<Customers> {
    return this.customersRepository.deleteCustomerByCpf(id);
  }
}
