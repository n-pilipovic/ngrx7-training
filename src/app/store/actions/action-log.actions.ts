import { createAction, props } from '@ngrx/store';

export const logAction = createAction('[Action Log] log action', props<{payload: string}>());
