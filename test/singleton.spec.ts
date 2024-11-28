import { DynamoDBClient } from "@aws-sdk/client-dynamodb"; // Importa o cliente DynamoDB
import { DeepMockProxy, mockDeep, mockReset } from "jest-mock-extended";

// Mock do DynamoDB
jest.mock("@aws-sdk/client-dynamodb", () => ({
  DynamoDBClient: jest.fn().mockImplementation(() => ({
    // Aqui você pode adicionar os métodos mockados do DynamoDB que você está usando, por exemplo:
    send: jest.fn().mockResolvedValue({ /* resposta mockada */ }),
  })),
}));

// Recupera a instância do DynamoDB mockado
export const dynamoDBMock = DynamoDBClient as unknown as DeepMockProxy<DynamoDBClient>;

beforeEach(() => {
  mockReset(dynamoDBMock); // Reseta o mock antes de cada teste
});

describe('Singleton', () => {
  it('should be defined', () => {
    expect(true).toBe(true);
  });
});
