import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Show } from '../models/show';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import * as fromRoot from '../store/reducers';
import * as searchActions from './store/search-actions';

@Component({
  selector: 'cg-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {

  queryControl: FormControl;
  shows: Observable<Show[]>;
  changesSub: Subscription;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.shows = this.store.select(fromRoot.searchResults);

    this.queryControl = new FormControl('');
    this.changesSub = this.queryControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((query: string) => {
        if (query) {
          this.store.dispatch(new searchActions.Fetch(query));
        } else {
          this.store.dispatch(new searchActions.Found([]));
        }
      });
  }

  ngOnDestroy() {
    this.changesSub.unsubscribe();
  }

}
