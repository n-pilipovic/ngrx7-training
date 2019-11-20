import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Phone } from '../../../models/phone.interface';
import { selectEntireCart } from '../selectors/cart.selectors';
import { addToCart, checkoutCart, loadCart, removeFromCart } from '../actions/cart.actions';
import { State } from '../models/app-state';

@Injectable()
export class CartFacade {

  getCart = this.store.pipe(select(selectEntireCart));

  constructor(
    private store: Store<State>
  ) {}

  loadCart(): void {
    this.store.dispatch(loadCart());
  }

  addToCart(phone: Phone): void {
    this.store.dispatch(addToCart({phone}));
  }

  removeFromCart(index: number): void {
    this.store.dispatch(removeFromCart({index}));
  }

  checkout(): void {
    this.store.dispatch(checkoutCart());
  }
}
