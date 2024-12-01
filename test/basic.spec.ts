import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../src/Presentation/Customers/customers.controller';
import { CustomerService } from '../src/Application/services/customer.service';
import { DynamoDBService } from '../src/Infrastructure/Apis/dynamodb.service';
import { CreateCustomerDto } from '../src/Presentation/Customers/dtos/create-customer.dto';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomerService;

  beforeEach(async () => {
    // Configura a instância do NestJS para o controlador e o serviço
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomerService, DynamoDBService],
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

      // Mock do serviço para retornar o cliente criado
      jest.spyOn(service, 'createCustomer').mockResolvedValue(createCustomerDto);

      const response = await controller.createCustomer(createCustomerDto);

      // Verifica se a resposta do controlador é a esperada
      expect(response).toEqual({
        cpf: '12345678900',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      });
    });
  });
});
