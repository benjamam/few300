import { RouterState, routerReducer } from '@ngrx/router-store';


export interface AppState {

  router: RouterState.Minimal;
}

export const reducers = {
  router: routerReducer
};
