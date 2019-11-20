import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadPhones, loadPhonesFailed, loadPhonesSuccess } from '../actions/phone.actions';
import { AppService } from '../../app.service';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { checkoutCart, checkoutCartFailed, checkoutCartSuccess } from '../actions/cart.actions';
import { select, Store } from '@ngrx/store';
import { State } from '../models/app-state';
import { selectEntireCart } from '../selectors/cart.selectors';


@Injectable()
export class ApiEffects {

  loadPhones$ = createEffect(() => this.actions$.pipe(
    ofType(loadPhones),
    mergeMap(() => this.appService.getPhones()
      .pipe(
        map(phones => loadPhonesSuccess({phones})),
        catchError(() => loadPhonesFailed)
      ))
    )
  );

  checkout$ = createEffect(() => this.actions$.pipe(
    ofType(checkoutCart),
    withLatestFrom(this.store.pipe(select(selectEntireCart))),
    mergeMap(([action, phones]) => this.appService.checkoutCart(phones)
      .pipe(
        map((message) => checkoutCartSuccess({message})),
        catchError(() => checkoutCartFailed)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private appService: AppService
  ) {}
}
