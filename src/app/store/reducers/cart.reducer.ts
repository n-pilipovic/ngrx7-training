import { createReducer, on } from '@ngrx/store';
import { addToCart, checkoutCartSuccess, loadCartSuccess, removeFromCart } from '../actions/cart.actions';
import { initialState } from '../models/app-state';


export const cartReducer = createReducer(
  initialState.cart,
  on(addToCart, (state, action) => [...state, action.phone]),
  on(removeFromCart, (state, action) => state = state.filter((phone, index) => index !== action.index)),
  on(checkoutCartSuccess, (state, action) => []),
  on(loadCartSuccess, (state, action) => [...action.phones]),
);
