import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GiftGivingState, selectShowAllHolidays } from '../../../reducers';
import * as actions from '../../../actions/sort-filter.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sort-filter',
  templateUrl: './sort-filter.component.html',
  styleUrls: ['./sort-filter.component.css']
})
export class SortFilterComponent implements OnInit {

  showAll$: Observable<boolean>;
  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
    this.showAll$ = this.store.select(selectShowAllHolidays);
  }

  viewAll() {
    this.store.dispatch(actions.filterShowAll());
  }

  showOnlyUpcoming() {
    this.store.dispatch(actions.filterShowOnlyUpcoming());
  }

  sortByName() {
    this.store.dispatch(actions.sortHolidaysByName());
  }

  sortByDate() {
    this.store.dispatch(actions.sortHolidaysByDate());
  }
}
