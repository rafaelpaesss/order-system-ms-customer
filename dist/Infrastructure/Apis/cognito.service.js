"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsCognitoService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
let AwsCognitoService = class AwsCognitoService {
    constructor(configService) {
        this.configService = configService;
        this.userPool = new amazon_cognito_identity_js_1.CognitoUserPool({
            UserPoolId: String(this.configService.get('COGNITO_USER_POOL_ID')),
            ClientId: String(this.configService.get('COGNITO_CLIENT_ID')),
        });
    }
    async saveCognitoUser(customer) {
        const { cpf, name, email } = customer;
        return new Promise((resolve, reject) => {
            this.userPool.signUp(cpf, cpf, [
                new amazon_cognito_identity_js_1.CognitoUserAttribute({
                    Name: 'name',
                    Value: name,
                }),
                new amazon_cognito_identity_js_1.CognitoUserAttribute({
                    Name: 'email',
                    Value: email,
                }),
            ], [], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result?.user);
            });
        });
    }
};
exports.AwsCognitoService = AwsCognitoService;
exports.AwsCognitoService = AwsCognitoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AwsCognitoService);
//# sourceMappingURL=cognito.service.js.map