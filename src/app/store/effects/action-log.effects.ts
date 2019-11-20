import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';
import { logAction } from '../actions/action-log.actions';


@Injectable()
export class ActionLogEffects {

  logAction$ = createEffect(() => this.actions$.pipe(
    filter(action => action.type !== logAction.type),
    map(action => logAction({ payload: action.type }))
    )
  );

  constructor(
    private actions$: Actions
  ) {
  }
}
