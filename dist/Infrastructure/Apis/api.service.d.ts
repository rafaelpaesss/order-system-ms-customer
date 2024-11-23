import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
export declare abstract class BaseHttpRequestService {
    protected readonly configService: ConfigService;
    protected httpService: HttpService;
    constructor(configService: ConfigService, httpService: HttpService);
    private readonly USERID;
    private readonly POSID;
    private readonly TOKEN;
    request(options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<any, any>>;
}
