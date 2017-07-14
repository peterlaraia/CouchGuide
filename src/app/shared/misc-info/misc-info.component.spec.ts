import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscInfoComponent } from './misc-info.component';
import { HandshakeComponent } from '../handshake.component';

describe('MiscInfoComponent', () => {
  let component: MiscInfoComponent;
  let fixture: ComponentFixture<MiscInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscInfoComponent, HandshakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscInfoComponent);
    component = fixture.componentInstance;
  });

  describe('displayRuntime()', () => {
    it('should display hour only', () => {
      expect(component.displayRuntime(60)).toBe('1h');
      expect(component.displayRuntime(120)).toBe('2h');
    });

    it('should display minutes when < 1h', () => {
      expect(component.displayRuntime(35)).toBe('35m');
      expect(component.displayRuntime(24)).toBe('24m');
    });

    it('should display h + m split', () => {
      expect(component.displayRuntime(90)).toBe('1h 30m');
      expect(component.displayRuntime(100)).toBe('1h 40m');
    });

    it('should display ludicrous runtimes', () => {
      expect(component.displayRuntime(1000)).toBe('16h 40m');
      expect(component.displayRuntime(481029)).toBe('8017h 9m');
    });

    it('should display runtime 0 as 0m', () => {
      expect(component.displayRuntime(0)).toBe('0m');
    });

    it('should display data unavailable message if no runtime given', () => {
      expect(component.displayRuntime(null)).toBe('Data unavailable');
      expect(component.displayRuntime(undefined)).toBe('Data unavailable');
    });
  });

  describe('flagAsset()', () => {
    it('should return link to flag svg given country code', () => {
      expect(component.flagAsset('DE')).toBe('assets/img/flags/de.svg');
      expect(component.flagAsset('us')).toBe('assets/img/flags/us.svg');
      expect(component.flagAsset('kR')).toBe('assets/img/flags/kr.svg');
    });

    it('should be ok to return broken link if country code null', () => {
      expect(component.flagAsset(null)).toBe('assets/img/flags/null.svg');
      expect(component.flagAsset(undefined)).toBe('assets/img/flags/undefined.svg');
    });
  });

  describe('networkUrl()', () => {
    it('should return a simple link to the tvMaze tv-network path', () => {
      expect(component.networkUrl(1, 'CBS')).toContain('/networks/1/cbs');
      expect(component.networkUrl(3, 'abc')).toContain('/networks/3/abc');
    });

    it('should replace spaces with hyphens in network names', () => {
      expect(component.networkUrl(5, 'The CW')).toContain('/networks/5/the-cw');
    });

    it('should use null or undefined in url if given', () => {
      expect(component.networkUrl(null, null)).toContain('/networks/null/null');
      expect(component.networkUrl(undefined, undefined)).toContain('/networks/undefined/undefined');
    });
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
