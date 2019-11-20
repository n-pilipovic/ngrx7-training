import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Phone } from '../../../models/phone.interface';

export const PHONE_FEATURE_KEY = 'phones';

export const selectPhones = createFeatureSelector(PHONE_FEATURE_KEY);

export const selectAllPhones = createSelector(
  selectPhones,
  (allPhones: Phone[]) => {
      return allPhones;
  }
);
