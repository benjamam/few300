import { Component, OnInit } from '@angular/core';
import { GiftGivingState, selectHolidayListItems, selectHolidaysLoaded } from '../../reducers';
import { Observable } from 'rxjs';
import { HolidayListItem } from '../../models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {

  holidays$: Observable<HolidayListItem[]>;
  holidaysLoaded$: Observable<boolean>;

  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
    this.holidays$ = this.store.select(selectHolidayListItems);
    this.holidaysLoaded$ = this.store.select(selectHolidaysLoaded);
  }

}
