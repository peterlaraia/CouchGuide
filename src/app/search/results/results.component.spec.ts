import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { appRoutes } from '../../app.routes';
import { CoreModule } from '../../core/core.module';
import { Show } from '../../models/show';
import { ResultsComponent } from './results.component';
import { SharedModule } from '../../shared/shared.module';
import { ShowComponent } from '../../show/show.component';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
        ]),
        SharedModule,
        CoreModule
      ],
      declarations: [
        ResultsComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    const shows: Show[] = [
      { id: 1, name: 'show 1', image: { medium: 'src url' } },
      { id: 2, name: 'show 2' }
    ];
    component.shows = shows;

    fixture.detectChanges();
  });

  describe('view', () => {
    it('should list some shows', () => {
      expect(de.queryAll(By.css('.result')).length).toBe(2);
      expect(de.queryAll(By.css('img')).length).toBe(1);
    });

    it('should navigate to a show when clicking on result', () => {
      const spy = spyOn(de.injector.get(Router), 'navigate');
      de.query(By.css('.result')).triggerEventHandler('click', { button: 0 });
      expect(spy.calls.count()).toBe(1);
      expect(spy.calls.mostRecent().args[0]).toEqual(['/shows', 1]);
    });
  });
});
