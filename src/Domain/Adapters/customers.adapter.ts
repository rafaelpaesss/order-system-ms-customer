import { Customer } from '../Interfaces/customer';
import { DynamoDBService } from '../../Infrastructure/Apis/dynamodb.service';

export class CustomersAdapter {
  static toCustomer(dynamoDbItem: any): Customer {
    // Converte os dados do DynamoDB para o formato desejado pela aplicação
    return {
      cpf: dynamoDbItem.cpf.S,
      name: dynamoDbItem.name.S,
      email: dynamoDbItem.email.S,
    };
  }

  static toDynamoDBItem(customer: Customer): any {
    // Converte o formato do objeto 'Customer' para o formato que o DynamoDB espera
    return {
      cpf: { S: customer.cpf },
      name: { S: customer.name },
      email: { S: customer.email },
    };
  }
}
