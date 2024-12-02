import { Customer } from '../../Domain/Interfaces/customer';

// Função mock para simular um cliente
export const mockCustomer = (cpf: string): Customer => ({
  cpf,
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'password123', // Simule uma senha para o teste
});

// Função mock para simular o comportamento do CustomersRepository
export const mockGetCustomerByCpf = (cpf: string): Customer | null => {
  // Simula que o cliente com o CPF fornecido existe
  if (cpf === '12345678900') {
    return mockCustomer(cpf);
  }
  return null; // Simula que o cliente não foi encontrado
};

// Função mock para simular a criação de um cliente
export const mockCreateCustomer = (cpf: string, name: string, email: string, password: string): Customer => {
  return {
    cpf,
    name,
    email,
    password,
  };
};

// Função para mockar a resposta de erro em uma operação do repository
export const mockGetCustomerError = () => {
  throw new Error('Database connection failed');
};
