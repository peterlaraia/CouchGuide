import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NgTabModule } from '@pevil/ng-tabs';
import { Observable } from 'rxjs/Observable';
import { ShowComponent } from './show.component';
import { ShowModule } from './show.module';

describe('ShowComponent', () => {
  let component: ShowComponent;
  let fixture: ComponentFixture<ShowComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgTabModule, ShowModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  });

  describe('onInit', () => {
    it('should get show information from route resolver', () => {
      const route: ActivatedRoute = de.injector.get(ActivatedRoute);
      route.data = Observable.of({
        show: {
          id: 1, name: 'tv show'
        }
      });
      expect(component.show).not.toBeDefined();
      fixture.detectChanges();
      expect(component.show).toEqual({
        id: 1, name: 'tv show'
      });
    });
  });
});
