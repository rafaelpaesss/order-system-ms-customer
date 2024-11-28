import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended'; // Mocks

// Supondo que você tenha um repositório que interage com o DynamoDB
import { CustomersRepository } from 'src/Domain/Repositories/customersRepository'; // Ajuste o caminho conforme necessário

// Criando o mock do repositório que usa DynamoDB
const customersRepositoryMock = mockDeep<CustomersRepository>();

// Mock do repositório
jest.mock('src/Domain/Repositories/customersRepository', () => ({
  __esModule: true,
  CustomersRepository: customersRepositoryMock, // Mock do CustomersRepository
}));

// Exporta o mock para os testes
export const customersRepositoryMockInstance = customersRepositoryMock as unknown as DeepMockProxy<CustomersRepository>;

// Reseta o mock antes de cada teste
beforeEach(() => {
  mockReset(customersRepositoryMockInstance); // Reseta o mock antes de cada teste
});
