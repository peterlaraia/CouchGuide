import { TestBed, inject } from '@angular/core/testing';

import { SslService } from './ssl.service';

describe('SslService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SslService]
    });
  });

  it('should take a http url and convert to https', inject([SslService], (service: SslService) => {
    expect(service.toHttps('http://url.nbet')).toBe('https://url.nbet');
  }));

  it('should leave an https url as is', inject([SslService], (service: SslService) => {
    expect(service.toHttps('https://url.nbet')).toBe('https://url.nbet');
  }));
});
