import { Request, Response, NextFunction } from 'express';
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';
import { CreateCustomerDto } from './dtos/create-customer.dto'; // Ajuste o caminho conforme necessário

export class CustomerController {
  private customersRepository: CustomersRepository;

  constructor() {
    this.customersRepository = new CustomersRepository();
  }

  createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cpf, name, email, password }: CreateCustomerDto = req.body;

      if (!cpf || !name || !email || !password) {
        throw new Error('Missing required fields');
      }

      const customer = await this.customersRepository.createCustomer(cpf, name, email, password);
      return res.status(201).json(customer);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: 'An unknown error occurred' });
    }
  };

  getCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cpf } = req.params;
      if (!cpf) throw new Error('Missing CPF');

      const customer = await this.customersRepository.getCustomerByCpf(cpf);
      if (!customer) throw new Error('Customer not found');

      return res.status(200).json(customer);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: 'An unknown error occurred' });
    }
  };
}
