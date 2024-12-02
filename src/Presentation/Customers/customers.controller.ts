import { Request, Response } from 'express';
import { CustomerService } from '../../Application/services/customer.service';

const customerService = new CustomerService();

export class CustomersController {
  static async createCustomer(req: Request, res: Response) {
    const { cpf, name, email } = req.body;

    if (!cpf || !name || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const customer = await customerService.createCustomer(cpf, name, email);
      return res.status(201).json(customer);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getCustomer(req: Request, res: Response) {
    const { cpf } = req.params;

    if (!cpf) {
      return res.status(400).json({ message: "CPF is required" });
    }

    try {
      const customer = await customerService.getCustomer(cpf);
      return res.status(200).json(customer);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
