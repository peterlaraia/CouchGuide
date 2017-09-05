import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../core/core.module';
import { HomeComponent } from './home.component';
import { GuideModule } from './guide/guide.module';
import { reducer as guideReducer } from './guide/store/guide-reducer';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        GuideModule,
        StoreModule.provideStore({guide: guideReducer}),
        CoreModule
      ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  describe('redirectToSearch()', () => {
    it('should navigate to the search route', () => {
      const router: Router = fixture.debugElement.injector.get(Router);
      const spy = spyOn(router, 'navigate');
      component.redirectToSearch();

      expect(spy.calls.count()).toBe(1);
      expect(spy.calls.mostRecent().args[0]).toEqual(['/search']);
    });
  });
});
