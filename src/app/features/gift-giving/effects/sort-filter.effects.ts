import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions/sort-filter.actions';
import { map, tap, filter } from 'rxjs/operators';

@Injectable()
export class SortFilterEffects {

  loadSort$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadSavedPrefs),
      map(() => localStorage.getItem('holiday-sort')),
      filter(savedSort => savedSort !== null),
      map(savedSort => {
        if (savedSort === 'name') {
          return actions.sortHolidaysByName();
        } else {
          return actions.sortHolidaysByDate();
        }
      })
    )
  );

  loadFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadSavedPrefs),
      map(() => localStorage.getItem('holiday-filter')),
      filter(savedFilter => savedFilter !== null),
      map(savedFilter => {
        if (savedFilter === 'all') {
          return actions.filterShowAll();
        } else {
          return actions.filterShowOnlyUpcoming();
        }
      })
    )
  );

  saveSortHolidayName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.sortHolidaysByName),
      tap(() => localStorage.setItem('holiday-sort', 'name'))
    ), { dispatch: false }
  );

  saveSortHolidayDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.sortHolidaysByDate),
      tap(() => localStorage.setItem('holiday-sort', 'date'))
    ), { dispatch: false }
  );

  saveFilterAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.filterShowAll),
      tap(() => localStorage.setItem('holiday-filter', 'all'))
    ), { dispatch: false }
  );

  saveFilterUpcoming$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.filterShowOnlyUpcoming),
      tap(() => localStorage.setItem('holiday-filter', 'upcoming'))
    ), { dispatch: false }
  );

  constructor(private actions$: Actions) { }
}
