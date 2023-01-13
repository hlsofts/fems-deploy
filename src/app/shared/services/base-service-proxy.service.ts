import { Injectable, Inject, Optional, InjectionToken } from '../../../../node_modules/@angular/core/core';
import { InjectionToken } from '../../../../node_modules/@angular/core/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class BaseServiceProxyService {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }
}
