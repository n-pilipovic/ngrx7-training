import { Phone } from '../../../models/phone.interface';

export interface State {
  phones: Array<Phone>;
  cart: Array<Phone>;
  actionLog: Array<string>;
}

export const initialState: State = {
  phones: [],
  cart: [],
  actionLog: []
};
