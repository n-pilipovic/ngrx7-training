import { ActionReducerMap } from '@ngrx/store';
import { State } from '../models/app-state';
import { actionLogReducer } from './meta.reducer';
import { cartReducer } from './cart.reducer';
import { phoneReducer } from './phone.reducer';


export const reducers: ActionReducerMap<State> = {
  phones: phoneReducer,
  cart: cartReducer,
  actionLog: actionLogReducer
};
