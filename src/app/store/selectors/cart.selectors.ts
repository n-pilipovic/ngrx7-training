import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Phone } from '../../../models/phone.interface';

export const CART_FEATURE_KEY = 'cart';

export const selectCart = createFeatureSelector(CART_FEATURE_KEY);

export const selectEntireCart = createSelector(
  selectCart,
  (allPhones: Phone[]) => {
    return allPhones;
  }
);
