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

      // Chama o serviço de criação de cliente
      const customer = await this.customerService.createCustomer(createCustomerDto);

      const customerDto: CustomerDto = {
        cpf: customer.cpf,
        name: customer.name,
        email: customer.email,
      };

      return res.status(201).json(customerDto);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getCustomer(req: Request, res: Response): Promise<Response> {
    try {
      const { cpf, password } = req.body;

      if (!cpf || !password) {
        return res.status(400).json({ message: 'CPF and password are required' });
      }

      // Chama o serviço de busca de cliente
      const customer = await this.customerService.getCustomer(cpf, password);

      const customerDto: CustomerDto = {
        cpf: customer.cpf,
        name: customer.name,
        email: customer.email,
      };

      return res.status(200).json(customerDto);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
