import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { Customers } from 'src/Domain/Interfaces/customer';

@Injectable()
export class AwsCognitoService {
  private readonly userPool: CognitoUserPool;

  constructor(private readonly configService: ConfigService) {
    this.userPool = new CognitoUserPool({
      UserPoolId: String(
        this.configService.get<string>('COGNITO_USER_POOL_ID'),
      ),
      ClientId: String(this.configService.get<string>('COGNITO_CLIENT_ID')),
    });
  }

  async saveCognitoUser(customer: Customers) {
    const { cpf, name, email } = customer;

    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        cpf!,
        cpf!,
        [
          new CognitoUserAttribute({
            Name: 'name',
            Value: name!,
          }),
          new CognitoUserAttribute({
            Name: 'email',
            Value: email!,
          }),
        ],
        [],
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result?.user);
        },
      );
    });
  }
}

