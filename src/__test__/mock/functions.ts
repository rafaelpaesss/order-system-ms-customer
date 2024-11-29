// src/__test__/mock/functions.ts

// Mock para DynamoDB
export const mockDynamoDB = () => {
  // Implemente o mock do DynamoDB aqui
  // Exemplo:
  return {
    putItem: jest.fn().mockResolvedValue({}),
    getItem: jest.fn().mockResolvedValue({}),
    // Outros métodos do DynamoDB conforme necessário
  };
};

// Mock para criar um cliente
export const mockCreateCustomer = () => {
  // Implemente o mock de criação de cliente aqui
  // Exemplo:
  return {
    cpf: '12345678901',
    name: 'Cliente Teste',
    password: 'senha123',
    // Outros campos conforme necessário
  };
};

// Mock para buscar um cliente por CPF
export const mockGetCustomerByCpf = (cpf: string) => {
  // Implemente o mock para buscar cliente por CPF
  // Exemplo:
  if (cpf === '12345678901') {
    return {
      cpf: '12345678901',
      name: 'Cliente Teste',
      password: 'senha123', // Senha correta para o teste
    };
  }
  return null; // Retorna null caso o CPF não seja encontrado
};

// Função para resetar mocks
export const resetMocks = () => {
  jest.clearAllMocks(); // Reseta todos os mocks do Jest
};
