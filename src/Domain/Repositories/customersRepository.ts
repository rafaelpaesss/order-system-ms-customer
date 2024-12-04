import { Customer } from '../Interfaces/customer';

export abstract class CustomersRepository {
  /**
   * Recupera um cliente pelo CPF.
   * @param cpf CPF do cliente.
   * @returns O cliente correspondente ou `null` se não encontrado.
   */
  abstract getCustomerByCpf(cpf: string): Promise<Customer | null>;

  /**
   * Salva um novo cliente.
   * @param customer Dados do cliente a ser salvo.
   * @returns O cliente salvo.
   */
  abstract saveCustomer(customer: Customer): Promise<Customer>;

  /**
   * Atualiza as informações de um cliente existente.
   * @param customer Dados atualizados do cliente.
   * @returns O cliente atualizado.
   */
  abstract updateCustomer(customer: Customer): Promise<Customer>;

  /**
   * Remove um cliente pelo CPF.
   * @param cpf CPF do cliente a ser removido.
   * @returns O cliente removido ou `null` se não encontrado.
   */
  abstract deleteCustomerByCpf(cpf: string): Promise<Customer | null>;
}
