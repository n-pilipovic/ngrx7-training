import { Component, OnInit } from '@angular/core';
import { PhoneFacade } from './store/facades/phone.facade';
import { Observable } from 'rxjs';
import { Phone } from '../models/phone.interface';
import { CartFacade } from './store/facades/cart.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  phones$: Observable<Phone[]>;
  cart$: Observable<Phone[]>;

  constructor(
    private phoneFacade: PhoneFacade,
    private cartFacade: CartFacade
  ) {
    this.phones$ = this.phoneFacade.getPhones;
    this.cart$ = this.cartFacade.getCart;
  }

  ngOnInit(): void {
    this.phoneFacade.loadPhones();
    this.cartFacade.loadCart();
  }

  addToCart(phone: Phone): void {
    this.cartFacade.addToCart(phone);
  }

  removeFromCart(index: number): void {
    this.cartFacade.removeFromCart(index);
  }

  checkout(): void {
    this.cartFacade.checkout();
  }
}
