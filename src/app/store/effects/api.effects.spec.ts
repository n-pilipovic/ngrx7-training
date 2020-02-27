import { TestBed } from '@angular/core/testing';
import { from, Observable, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { phones } from '../../../mock-api/phones/phones';
import { ApiEffects } from './api.effects';
import { AppService } from '../../app.service';
import { cold, hot } from 'jasmine-marbles';
import { loadPhones, loadPhonesSuccess } from '../actions/phone.actions';
import { checkoutCart, checkoutCartSuccess } from '../actions/cart.actions';
import { TestScheduler } from 'rxjs/testing';

let testScheduler: TestScheduler;

describe('ApiEffects', () => {
  let actions$: Observable<any>;
  let effects: ApiEffects;
  let store;
  let service;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    TestBed.configureTestingModule({
      providers: [
        ApiEffects,
        provideMockStore({initialState: { phones }}),
        provideMockActions(() => actions$),
        { provide: AppService,
          useValue: {
            getPhones: () => {},
            checkoutCart: (data) => {}
          }}
      ],
    });

    store = TestBed.get(Store);
    effects = TestBed.get(ApiEffects);
    store.overrideSelector('selectEntireCart', phones);
    service = TestBed.get(AppService);
  });

  it('should get all phones from API', () => {

    spyOn(service, 'getPhones').and.returnValue(of(phones));

    actions$ = hot('a', {a: loadPhones()});
    const expected = cold('a', {a: loadPhonesSuccess({phones})});

    expect(effects.loadPhones$).toBeObservable(expected);
  });


  it('should checkout cart', () => {
    const message = 'Successful checkout!';

    spyOn(service, 'checkoutCart').and.returnValue(of(message));

    actions$ = hot('a', {a: checkoutCart()});
    const expected = cold('a', {a: checkoutCartSuccess({message})});

    expect(effects.checkout$).toBeObservable(expected);
  });

  it('should checkout cart', () => {
    const actual = from(['hello', 'world', 'novica']);
    const expected = cold('(abc|)', {a: 'hello', b: 'world', c: 'novica'});

    expect(actual).toBeObservable(expected);
  });

  // This test will actually run *synchronously*
  it('should get all phones from API', () => {
    testScheduler.run(({ cold, hot, expectObservable, expectSubscriptions }) => {
      actions$ =  hot('a', {a: loadPhones()});
      spyOn(service, 'getPhones').and.returnValue(cold('a|', {a: phones}));

      expectObservable(effects.loadPhones$).toBe('a', {
        a: {
          type: '[Phone] Load list success',
          phones
        }
      });
    });
  });

});
