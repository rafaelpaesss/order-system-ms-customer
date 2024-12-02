import { Request, Response, NextFunction } from 'express';
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';
import { CreateCustomerDto } from '../../Presentation/Customers/dtos/create-customer.dto';  // Importando o DTO
import { Customer } from '../../Domain/Interfaces/customer';

const customersRepository = new CustomersRepository();

export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cpf, name, email, password }: CreateCustomerDto = req.body;  // Usando o DTO para tipar a requisição

    if (!cpf || !name || !email || !password) {
      throw new Error('Missing required fields');
    }

    const customer: Customer = await customersRepository.createCustomer(cpf, name, email, password);

    return res.status(201).json(customer);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({ message: 'An unknown error occurred' });
  }
};

export const getCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cpf } = req.params;

    if (!cpf) {
      throw new Error('Missing CPF');
    }

    const customer: Customer | null = await customersRepository.getCustomerByCpf(cpf);

    if (!customer) {
      throw new Error('Customer not found');
    }

    return res.status(200).json(customer);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({ message: 'An unknown error occurred' });
  }
};

export const updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cpf, name, email, password }: CreateCustomerDto = req.body;  // Usando o DTO também para atualização

    if (!cpf || !name || !email || !password) {
      throw new Error('Missing required fields');
    }

    const updatedCustomer = await customersRepository.updateCustomer({
      cpf,
      name,
      email,
      password,
    });

    return res.status(200).json(updatedCustomer);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({ message: 'An unknown error occurred' });
  }
};
