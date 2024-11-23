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
exports.BaseHttpRequestService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let BaseHttpRequestService = class BaseHttpRequestService {
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
        this.USERID = this.configService.get('USERID');
        this.POSID = this.configService.get('POSID');
        this.TOKEN = this.configService.get('TOKEN_MERCADO_PAGO');
    }
    async request(options) {
        const headers = {
            ['Content-Type']: 'application/json',
            ['Authorization']: `Bearer ${this.TOKEN}`,
        };
        return await (0, rxjs_1.firstValueFrom)(this.httpService.request({
            ...options,
            baseURL: `https://api.mercadopago.com/instore/orders/qr/seller/collectors/${this.USERID}/pos/${this.POSID}/qrs`,
            headers,
        }));
    }
};
exports.BaseHttpRequestService = BaseHttpRequestService;
exports.BaseHttpRequestService = BaseHttpRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService])
], BaseHttpRequestService);
//# sourceMappingURL=api.service.js.map