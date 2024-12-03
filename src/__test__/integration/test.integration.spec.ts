import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../../../Presentation/Customers/customers.controller'; // Corrigido o caminho do controller
import { DynamoDBService } from '@Apis/dynamoDB.service';
import { CustomersService } from '@Services/customers.service';
import { DynamoDBHealthIndicator } from '@Health/DynamoDBHealthIndicator.service';

describe('CustomersController', () => {
  let controllerCustomers: CustomersController;
  let customersService: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService, DynamoDBService, DynamoDBHealthIndicator],
    }).compile();

    controllerCustomers = module.get<CustomersController>(CustomersController);
    customersService = module.get<CustomersService>(CustomersService);
  });

  it('should return a customer by CPF', async () => {
    const customer = { cpf: '12345678900', name: 'John Doe' }; // Simulando um CPF válido
    jest.spyOn(customersService, 'getByCpf').mockResolvedValue(customer);

    const customerDb = await controllerCustomers.getByCpf(customer.cpf);
    expect(customerDb).toEqual(customer); // Verifica se o retorno é o esperado
  });
});
