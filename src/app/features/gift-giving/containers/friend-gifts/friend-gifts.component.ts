import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { GiftGivingState, selectFriendHolidayModel } from '../../reducers';
import { setSelectedFriend } from '../../actions/friend.actions';
import { FriendHoliday } from '../../models';
import { assignHolidayToFriend } from '../../actions/friend-holiday.actions';

@Component({
  selector: 'app-friend-gifts',
  templateUrl: './friend-gifts.component.html',
  styleUrls: ['./friend-gifts.component.css']
})
export class FriendGiftsComponent implements OnInit, OnDestroy {

  model$: Observable<FriendHoliday>;
  subscription: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store<GiftGivingState>) { }
  ngOnInit() {
    this.model$ = this.store.select(selectFriendHolidayModel);
    this.subscription = this.activatedRoute.paramMap.pipe(
      map(params => {
        this.store.dispatch(setSelectedFriend({ id: params.get('id') }));
      })
    ).subscribe();
  }

  backToList() {
    this.router.navigate(['/gifts', 'friends']);
  }

  addHoliday(friendId: string, holidayId: string) {
    this.store.dispatch(assignHolidayToFriend({ friendId, holidayId }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
