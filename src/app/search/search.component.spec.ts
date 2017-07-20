import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreModule, Store } from '@ngrx/store';
import { CoreModule } from '../core/core.module';
import { ResultsComponent } from './results/results.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';
import { SearchComponent } from './search.component';
import { SharedModule } from '../shared/shared.module';
import * as searchActions from './store/search-actions';
import { reducer as searchReducer } from './store/search-reducer';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let de: DebugElement;
  let store: Store<any>;
  const debounce = 500;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        SharedModule,
        StoreModule.provideStore({ search: searchReducer }),
        CoreModule
      ],
      declarations: [
        SearchComponent,
        ResultsComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    store = de.injector.get(Store);
  });

  describe('onInit', () => {
    it('should init with empty form control', () => {
      fixture.detectChanges();
      expect(component.queryControl.value).toEqual('');
    });

    it('should grab the shows store', () => {
      const storeSpy = spyOn(store, 'select').and.returnValue(Observable.of([
        { id: 1 }, { id: 2 }, { id: 3 }
      ]));
      fixture.detectChanges();
      component.shows.first().subscribe((shows) => {
        expect(shows).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
      });
      expect(storeSpy.calls.count()).toBe(1);
    });
  });

  describe('search actions', () => {
    it('should run an initial search', fakeAsync(() => {
      const dispatcher = spyOn(store, 'dispatch');
      fixture.detectChanges();
      component.queryControl.setValue('query1');
      tick(debounce);

      expect(dispatcher.calls.count()).toBe(1);
      expect(dispatcher.calls.mostRecent().args[0]).toEqual(new searchActions.Fetch('query1'));
    }));

    it('should run a second search', fakeAsync(() => {
      const dispatcher = spyOn(store, 'dispatch');
      fixture.detectChanges();
      component.queryControl.setValue('query1');
      tick(debounce);

      component.queryControl.setValue('query2');
      tick(debounce);

      expect(dispatcher.calls.count()).toBe(2);
      expect(dispatcher.calls.mostRecent().args[0]).toEqual(new searchActions.Fetch('query2'));
    }));

    it('should only search after debounce', fakeAsync(() => {
      const dispatcher = spyOn(store, 'dispatch');
      fixture.detectChanges();
      component.queryControl.setValue('Dare');
      tick(debounce);

      component.queryControl.setValue('Dared');
      tick(25);
      component.queryControl.setValue('Darede');
      tick(25);
      component.queryControl.setValue('Daredev');
      tick(25);
      component.queryControl.setValue('Daredevi');
      tick(25);
      component.queryControl.setValue('Daredevil');
      tick(debounce);

      expect(dispatcher.calls.count()).toBe(2);
      expect(dispatcher.calls.mostRecent().args[0]).toEqual(new searchActions.Fetch('Daredevil'));
    }));

    it('should cancel duplicate search', fakeAsync(() => {
      const dispatcher = spyOn(store, 'dispatch');
      fixture.detectChanges();
      component.queryControl.setValue('query1');
      tick(debounce);

      component.queryControl.setValue('query');
      tick(100);
      component.queryControl.setValue('query1');
      tick(debounce);

      expect(dispatcher.calls.count()).toBe(1);
      expect(dispatcher.calls.mostRecent().args[0]).toEqual(new searchActions.Fetch('query1'));
    }));

    it('should emit empty found action on empty search string', fakeAsync(() => {
      const dispatcher = spyOn(store, 'dispatch');
      fixture.detectChanges();
      component.queryControl.setValue('query1');
      tick(debounce);

      component.queryControl.setValue('');
      tick(debounce);

      expect(dispatcher.calls.count()).toBe(2);
      expect(dispatcher.calls.mostRecent().args[0]).toEqual(new searchActions.Found([]));
    }));
  });
});
