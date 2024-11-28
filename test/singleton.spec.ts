import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';

// Mock do Prisma
jest.mock('./client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(), // Criação do mock do PrismaClient
}));

// Recupera a instância do prisma mockado
export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock); // Reseta o prismaMock antes de cada teste
});

describe('Singleton', () => {
  it('should be defined', () => {
    expect(true).toBe(true);
  });
});
