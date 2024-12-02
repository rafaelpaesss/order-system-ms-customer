import { Request, Response } from 'express';
import { CustomerService } from '../../Application/services/customer.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { CustomerDto } from './dtos/customers.dto';

export class CustomersController {
  private customerService: CustomerService;

  constructor() {
    this.customerService = new CustomerService();
  }

  async createCustomer(req: Request, res: Response): Promise<Response> {
    try {
      const createCustomerDto: CreateCustomerDto = req.body;

      const customer = await this.customerService.createCustomer(
        createCustomerDto.cpf,
        createCustomerDto.name,
        createCustomerDto.email,
        createCustomerDto.password
      );

      // Transformando os dados no formato adequado
      const customerDto: CustomerDto = {
        cpf: customer.cpf,
        name: customer.name,
        email: customer.email
      };

      return res.status(201).json(customerDto);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getCustomer(req: Request, res: Response): Promise<Response> {
    try {
      const { cpf, password } = req.body;

      const customer = await this.customerService.getCustomer(cpf, password);

      const customerDto: CustomerDto = {
        cpf: customer.cpf,
        name: customer.name,
        email: customer.email
      };

      return res.status(200).json(customerDto);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
