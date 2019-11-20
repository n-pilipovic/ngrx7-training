import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { addToCart, checkoutCartSuccess, loadCart, loadCartSuccess, removeFromCart } from '../actions/cart.actions';
import { select, Store } from '@ngrx/store';
import { selectEntireCart } from '../selectors/cart.selectors';
import { State } from '../models/app-state';
import { EMPTY, iif, of } from 'rxjs';

export const LOCAL_STORAGE_FEATURE_KEY = 'cart';


@Injectable()
export class LocalStorageEffects {

  syncLocalStorage$ = createEffect(() => this.actions$.pipe(
    ofType(addToCart, removeFromCart, checkoutCartSuccess),
    mergeMap(() => this.store.pipe(select(selectEntireCart))),
    tap(phones => localStorage.setItem(LOCAL_STORAGE_FEATURE_KEY, JSON.stringify(phones)))
    ),
    {
      dispatch: false
    }
  );

  loadLocalStorage$ = createEffect(() => this.actions$.pipe(
    ofType(loadCart.type),
    map(() => localStorage.getItem(LOCAL_STORAGE_FEATURE_KEY)),
    tap(console.log),
    switchMap((cart) => iif(
      () => !!cart,
      of(
        loadCartSuccess({ phones: JSON.parse(cart) })
      ),
      EMPTY
    ))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>
  ) {
  }
}
