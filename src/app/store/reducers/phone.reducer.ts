import { createReducer, on } from '@ngrx/store';
import { loadPhonesSuccess } from '../actions/phone.actions';
import { initialState } from '../models/app-state';


export const phoneReducer = createReducer(
  initialState.phones,
  on(loadPhonesSuccess, (state, action) => action.phones)
);
