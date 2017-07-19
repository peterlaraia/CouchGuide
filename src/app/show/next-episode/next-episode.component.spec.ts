import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextEpisodeComponent } from './next-episode.component';
import { SharedModule } from '../../shared/shared.module';

describe('NextEpisodeComponent', () => {
  let component: NextEpisodeComponent;
  let fixture: ComponentFixture<NextEpisodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [
        NextEpisodeComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextEpisodeComponent);
    component = fixture.componentInstance;
  });

  describe('displayEpisodeNumber()', () => {
    it('should display season and episode number', () => {
      expect(component.displayEpisodeNumber(1, 20)).toBe('S1 E20');
      expect(component.displayEpisodeNumber(2017, 100)).toBe('S2017 E100');
      expect(component.displayEpisodeNumber(0, 0)).toBe('S0 E0');
    });

    it('should display episode number only', () => {
      expect(component.displayEpisodeNumber(undefined, 27)).toBe('E27');
    });

    it('should display season only', () => {
      expect(component.displayEpisodeNumber(12, undefined)).toBe('S12');
    });

    it('should display no info if none provided', () => {
      expect(component.displayEpisodeNumber(undefined, undefined)).toBe('');
    });
  });
});
