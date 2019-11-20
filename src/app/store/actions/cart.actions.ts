import { createAction, props } from '@ngrx/store';
import { Phone } from '../../../models/phone.interface';


export const loadCart = createAction('[Cart] Load items local storage');
export const loadCartSuccess = createAction('[Cart] Load items local storage success', props<{phones: Phone[]}>());
export const addToCart = createAction('[Cart] Add item', props<{phone: Phone}>());
export const removeFromCart = createAction('[Cart] Remove item', props<{index: number}>());
export const checkoutCart = createAction('[Cart] Checkout');
export const checkoutCartSuccess = createAction('[Cart] Checkout success', props<{message: string}>());
export const checkoutCartFailed = createAction('[Cart] Checkout failed');

