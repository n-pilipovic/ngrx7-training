import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loadPhones } from '../actions/phone.actions';
import { selectAllPhones } from '../selectors/phone.selectors';
import { State } from '../models/app-state';

@Injectable()
export class PhoneFacade {

  getPhones = this.store.pipe(select(selectAllPhones));

  constructor(
    private store: Store<State>
  ) {}

  loadPhones(): void {
    this.store.dispatch(loadPhones());
  }
}
