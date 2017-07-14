import { TestBed, inject } from '@angular/core/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Headers,
  HttpModule,
  RequestMethod,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ShowService } from './show.service';

describe('ShowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ShowService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([ShowService], (service: ShowService) => {
    expect(service).toBeTruthy();
  }));
});
