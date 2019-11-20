import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Phone } from '../models/phone.interface';
import { environment } from '../environments/environment';

@Injectable()
export class AppService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getPhones(): Observable<Array<Phone>> {
    return this.httpClient.get<Phone[]>(environment.api.phones);
  }

  checkoutCart(phones: Phone[]): Observable<string> {
    return this.httpClient.post(environment.api.checkout, phones, { responseType: 'text'});
  }

}
