import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../src/Presentation/Customers/customers.controller';
import { CustomerService } from '../src/Application/services/customer.service';
import { CreateCustomerDto } from '../src/Presentation/Customers/dtos/create-customer.dto';

// Mock do CustomersRepository
class MockCustomerService {
  createCustomer(createCustomerDto: CreateCustomerDto) {
    return { ...createCustomerDto }; // Simula a criação do cliente
  }
}

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomerService,
          useClass: MockCustomerService, // Substitui o serviço real pelo mock
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCustomer', () => {
    it('should create a customer', async () => {
      const createCustomerDto: CreateCustomerDto = {
        cpf: '12345678900',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };

      const mockCustomerResponse = { ...createCustomerDto }; // Mocka a resposta esperada

      // Chama o método do controlador
      const response = await controller.createCustomer(createCustomerDto);

      // Verifica se a resposta do controlador é a esperada
      expect(response).toEqual(mockCustomerResponse);

      // Verifica se o serviço foi chamado com os parâmetros corretos
      expect(service.createCustomer).toHaveBeenCalledWith(createCustomerDto);
    });
  });
});
