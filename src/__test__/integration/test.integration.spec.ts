import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../../../Presentation/Customers/customers.controller'; // Corrigido o caminho do controller
import { CustomersService } from '../../../Application/services/customers.service'; // Corrigido o caminho do serviço
import { DynamoDBService } from '../../../Infrastructure/Apis/dynamoDB.service'; // Corrigido o caminho do DynamoDBService
import { DynamoDBHealthIndicator } from '../../../Presentation/Health/DynamoDBHealthIndicator.service'; // Corrigido o caminho do Health Indicator

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
