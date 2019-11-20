import { TestBed } from '@angular/core/testing';
import { LocalStorageEffects } from './local-storage.effects';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { phones } from '../../../mock-api/phones/phones';
import { cold, hot } from 'jasmine-marbles';
import { addToCart, checkoutCartSuccess } from '../actions/cart.actions';

describe('LocalStorageEffects', () => {
  let actions$: Observable<any>;
  let effects: LocalStorageEffects;
  let store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageEffects,
        provideMockStore({initialState: { phones }}),
        provideMockActions(() => actions$)
      ],
    });

    store = TestBed.get(Store);
    effects = TestBed.get(LocalStorageEffects);
    store.overrideSelector('selectEntireCart', phones);
  });

  // it('should update localStorage with phones in cart', () => {
  //
  //   actions$ = hot('a', {a: addToCart()});
  //   const expected = cold('a', {a: checkoutCartSuccess({message})});
  //
  //   expect(effects.syncLocalStorage$).toBeObservable(expected);
  // });
});
