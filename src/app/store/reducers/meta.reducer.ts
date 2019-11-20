import { createReducer, MetaReducer, on } from '@ngrx/store';
import { logAction } from '../actions/action-log.actions';
import { initialState, State } from '../models/app-state';
import { environment } from '../../../environments/environment';


export const actionLogReducer = createReducer(
  initialState.actionLog,
  on(logAction, (state, action) => {
    return [...state, action.payload];
  })
);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
