import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { CustomersController } from './Presentation/Customers/customers.controller';

const app = express();
app.use(express.json());

// Swagger configuration
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Customer API',
      version: '1.0.0',
      description: 'API for managing customers in DynamoDB',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Ou a URL do seu servidor EKS
      },
    ],
  },
  apis: ['./src/Presentation/Customers/customers.controller.ts'], // Path para o arquivo que contém as anotações da API
};

const specs = swaggerJsdoc(options);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Definindo os endpoints
app.post('/customers', CustomersController.createCustomer);
app.get('/customers/:cpf', CustomersController.getCustomer);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
