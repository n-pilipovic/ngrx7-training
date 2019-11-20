import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { ApiRequest } from '../models/api-request.model';
import { ApiResponse, ApiResponseBody, ErrorResponse } from '../models/api-response.model';
import { environment } from 'src/environments/environment';
import { phones } from '../phones/phones';
import { Phone } from 'src/models/phone.interface';

/**
 * We essentially mock a server here. Every outgoing request is
 * intercepted and an appropriate response is returned
 */

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: ApiRequest, next: HttpHandler): ApiResponse<ApiResponseBody> {
    return this.handleRequest(request);
  }

  handleRequest({url, params}: ApiRequest): ApiResponse<ApiResponseBody> {

    if (url === 'phones') {
      return this.constructResponse<any>(phones, 200);
    }

    if (url.includes(environment.api.phone)) {
      return this.getPhone(params.get('name'));
    }

    if (url === environment.api.checkout) {
      return this.constructResponse<any>('YOU ARE AWESOME', 200);
    }

    return this.handleUnknown();
  }

  getPhone(name: string) {
    const phone = phones.filter((p) => p.name === name)[0];
    return this.constructResponse<Phone>(phone, 200);
  }


  handleUnknown(): ApiResponse<ErrorResponse> {
    return this.constructResponse<ErrorResponse>({errorMsg: 'I don\'t know how to handle this'}, 400);
  }

  /**
   * Sinse we kept our API response generic we can generate different
   * types of responses. This is an example of how we could type
   * factory methods. We pass the type argument like this:
   * methodName<TypeWeWantToPass>() (like in calls above)
   */
  constructResponse<T>(body: T, status: number = 200): ApiResponse<T> {
    return of(new HttpResponse({body, status}));
  }
}
