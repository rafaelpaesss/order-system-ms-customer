import { DynamoDBClient, GetItemCommand, PutItemCommand, UpdateItemCommand, DeleteItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall, marshall } from '@aws-sdk/util-dynamodb';

const dynamoDbClient = new DynamoDBClient({ region: process.env.AWS_REGION });

const tableName = process.env.DYNAMODB_TABLE_NAME || 'customers';

// Método para obter um cliente por ID
export async function getCustomerById(id: string) {
  try {
    const command = new GetItemCommand({
      TableName: tableName,
      Key: marshall({ id }),
    });
    const { Item } = await dynamoDbClient.send(command);
    return Item ? unmarshall(Item) : null;
  } catch (error) {
    throw new Error(`Error fetching customer with ID ${id}: ${error.message}`);
  }
}

// Método para salvar um novo cliente
export async function saveCustomer(customer: Record<string, any>) {
  try {
    const command = new PutItemCommand({
      TableName: tableName,
      Item: marshall(customer),
    });
    await dynamoDbClient.send(command);
    return customer;
  } catch (error) {
    throw new Error(`Error saving customer: ${error.message}`);
  }
}

// Método para atualizar um cliente existente
export async function updateCustomer(id: string, updates: Record<string, any>) {
  try {
    const updateExpressions = [];
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};

    for (const [key, value] of Object.entries(updates)) {
      const attributeName = `#${key}`;
      const attributeValue = `:${key}`;
      updateExpressions.push(`${attributeName} = ${attributeValue}`);
      expressionAttributeValues[attributeValue] = value;
      expressionAttributeNames[attributeName] = key;
    }

    const command = new UpdateItemCommand({
      TableName: tableName,
      Key: marshall({ id }),
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeValues: marshall(expressionAttributeValues),
      ExpressionAttributeNames: expressionAttributeNames,
      ReturnValues: 'ALL_NEW',
    });

    const { Attributes } = await dynamoDbClient.send(command);
    return Attributes ? unmarshall(Attributes) : null;
  } catch (error) {
    throw new Error(`Error updating customer with ID ${id}: ${error.message}`);
  }
}

// Método para deletar um cliente por ID
export async function deleteCustomerById(id: string) {
  try {
    const command = new DeleteItemCommand({
      TableName: tableName,
      Key: marshall({ id }),
      ReturnValues: 'ALL_OLD',
    });

    const { Attributes } = await dynamoDbClient.send(command);
    return Attributes ? unmarshall(Attributes) : null;
  } catch (error) {
    throw new Error(`Error deleting customer with ID ${id}: ${error.message}`);
  }
}

// Método para buscar clientes por algum atributo (exemplo: CPF)
export async function getCustomersByAttribute(attribute: string, value: string) {
  try {
    const command = new QueryCommand({
      TableName: tableName,
      IndexName: `${attribute}-index`, // Certifique-se de ter um índice global secundário configurado
      KeyConditionExpression: `#${attribute} = :${attribute}`,
      ExpressionAttributeNames: {
        [`#${attribute}`]: attribute,
      },
      ExpressionAttributeValues: marshall({
        [`:${attribute}`]: value,
      }),
    });

    const { Items } = await dynamoDbClient.send(command);
    return Items ? Items.map((item) => unmarshall(item)) : [];
  } catch (error) {
    throw new Error(`Error querying customers by ${attribute}: ${error.message}`);
  }
}
