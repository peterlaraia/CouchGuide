import { TestBed, inject } from '@angular/core/testing';

import { ScheduleService } from './timezone.service';

describe('TimezoneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleService]
    });
  });

  it('should be created', inject([ScheduleService], (service: ScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
