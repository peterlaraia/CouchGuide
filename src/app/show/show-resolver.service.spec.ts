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
import { RouterTestingModule } from '@angular/router/testing';

import { ShowResolver } from './show-resolver.service';
import { ShowService } from './show.service';

describe('ShowResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule],
      providers: [
        ShowResolver,
        ShowService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([ShowResolver], (service: ShowResolver) => {
    expect(service).toBeTruthy();
  }));
});
