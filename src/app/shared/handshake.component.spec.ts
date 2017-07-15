import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HandshakeComponent } from './handshake.component';

@Component({
    selector: 'cg-test-comp',
    template: `
        <cg-handshake>
            <span left>left side</span>

            <span right>right</span><div right>side</div>
        </cg-handshake>
    `
})
class TestComponent {}

describe('HandshakeComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandshakeComponent, TestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('create a view with split content', () => {
    fixture.detectChanges();
    expect(de.query(By.css('.left-hand')).nativeElement.textContent.trim()).toEqual('left side');
    expect(de.query(By.css('.right-hand')).nativeElement.textContent.trim()).toEqual('rightside');
  });
});
