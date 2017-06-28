import { TestBed, inject } from '@angular/core/testing';

import { ShowResolver } from './show-resolver.service';

describe('ShowResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowResolver]
    });
  });

  it('should be created', inject([ShowResolver], (service: ShowResolver) => {
    expect(service).toBeTruthy();
  }));
});
