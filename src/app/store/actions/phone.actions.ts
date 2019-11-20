import { createAction, props } from '@ngrx/store';
import { Phone } from '../../../models/phone.interface';


export const loadPhones = createAction('[Phone] Load list');
export const loadPhonesSuccess = createAction('[Phone] Load list success', props<{phones: Phone[]}>());
export const loadPhonesFailed = createAction('[Phone] Load list failed');
