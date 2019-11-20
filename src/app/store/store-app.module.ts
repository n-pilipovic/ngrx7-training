import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import { PhoneFacade } from './facades/phone.facade';
import { ApiEffects } from './effects/api.effects';
import { LocalStorageEffects } from './effects/local-storage.effects';
import { CartFacade } from './facades/cart.facade';
import { ActionLogEffects } from './effects/action-log.effects';
import { reducers } from './reducers/app.reducer';
import { metaReducers } from './reducers/meta.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([ApiEffects, LocalStorageEffects, ActionLogEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    PhoneFacade,
    CartFacade
  ],
})
export class StoreAppModule { }
