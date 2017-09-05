import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { Store, StoreModule } from '@ngrx/store';
import { CoreModule } from '../../core/core.module';
import { GuideComponent } from './guide.component';
import * as actions from './store/guide-actions';
import { reducer } from './store/guide-reducer';

describe('GuideComponent', () => {
  let component: GuideComponent;
  let fixture: ComponentFixture<GuideComponent>;
  let de: DebugElement;
  let store: Store<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore({guide: reducer}),
        CoreModule
      ],
      declarations: [ GuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    store = de.injector.get(Store);
  });

  describe('onInit()', () => {
    it('should dispatch a fetch on today\'s schedule', () => {
      const dispatcher = spyOn(store, 'dispatch');
      fixture.detectChanges();
      expect(dispatcher.calls.count()).toBe(1);
      const takenAction: actions.FetchGuide = dispatcher.calls.mostRecent().args[0];
      expect(takenAction.type).toBe(actions.FETCH_GUIDE);
      expect(takenAction.payload.country).toEqual('US');
      expect(takenAction.payload.date.toDateString()).toEqual(new Date().toDateString());
    });
  });
});
