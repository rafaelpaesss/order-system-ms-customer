import { ConfigService } from '@nestjs/config';
import { Customers } from 'src/Domain/Interfaces/customer';
export declare class AwsCognitoService {
    private readonly configService;
    private readonly userPool;
    constructor(configService: ConfigService);
    saveCognitoUser(customer: Customers): Promise<unknown>;
}
