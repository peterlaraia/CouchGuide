import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Store, StoreModule } from '@ngrx/store';
import { NgTabModule } from '@pevil/ng-tabs';
import { Show } from '../models/show';
import { NextEpisodeComponent } from './next-episode/next-episode.component';
import { Observable } from 'rxjs/Observable';
import { SharedModule } from '../shared/shared.module';
import { ShowComponent } from './show.component';
import { ShowModule } from './show.module';
import * as actions from './store/show-actions';
import {reducer} from './store/show-reducer';

describe('ShowComponent', () => {
  let component: ShowComponent;
  let fixture: ComponentFixture<ShowComponent>;
  let de: DebugElement;
  let store: Store<any>;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgTabModule,
        SharedModule,
        StoreModule.provideStore({show: reducer})
      ],
      declarations: [ShowComponent, NextEpisodeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    store = de.injector.get(Store);
    route = de.injector.get(ActivatedRoute);
    route.params = Observable.of({
        id: 1, name: 'tv show'
    });
  });

  describe('show actions', () => {
    it('should dispatch a show fetch', () => {
      const dispatcher = spyOn(store, 'dispatch');
      fixture.detectChanges();
      expect(dispatcher.calls.count()).toBe(1);
      expect(dispatcher.calls.mostRecent().args[0]).toEqual(new actions.FetchShow(1));
    });

    it('should dispatch an episode fetch', fakeAsync(() => {
      const dispatcher = spyOn(store, 'dispatch');
      component.show$ = Observable.of({
        id: 1, _links: <any>{
          nextepisode: {href: 'url'}
        }
      });
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(dispatcher.calls.count()).toBe(2);
      expect(dispatcher.calls.mostRecent().args[0]).toEqual(new actions.FetchEpisode('url'));
    }));
  });
});
