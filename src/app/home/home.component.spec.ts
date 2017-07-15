import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
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
