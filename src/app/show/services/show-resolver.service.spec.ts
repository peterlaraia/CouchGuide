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

  describe('resolve()', () => {
    it('should get a show', inject([ShowResolver, ShowService], (service: ShowResolver, showSvc: ShowService) => {
      const spy = spyOn(showSvc, 'getShow');
      const routes: any = {
        params: { id: 255}
      };
      service.resolve(routes, null);
      expect(spy.calls.count()).toBe(1);
      expect(spy.calls.mostRecent().args[0]).toBe(255);
    }));
  });
});
