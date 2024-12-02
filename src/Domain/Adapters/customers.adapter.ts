import { Customer } from '../Interfaces/customer';

export class CustomersAdapter {
  static toCustomer(dynamoDbItem: any): Customer {
    return {
      cpf: dynamoDbItem.cpf.S,
      name: dynamoDbItem.name.S,
      email: dynamoDbItem.email.S,
      password: dynamoDbItem.password.S,  // Senha em texto simples
    };
  }

  static toDynamoDBItem(customer: Customer): any {
    return {
      cpf: { S: customer.cpf },
      name: { S: customer.name },
      email: { S: customer.email },
      password: { S: customer.password },  // Senha em texto simples
    };
  }
}
