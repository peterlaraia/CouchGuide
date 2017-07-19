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

import { Show } from '../../models/show';
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

  describe('getShow()', () => {
    it('should retrieve a show', inject([ShowService, XHRBackend],
      (service: ShowService, backend: MockBackend) => {
        const show = {
          id: 1, name: 'television show'
        };

        backend.connections.subscribe((c: MockConnection) => {
          expect(c.request.url).toContain('/shows/1');
          expect(c.request.method).toBe(RequestMethod.Get);
          c.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(show)
          })));
        });

        service.getShow(1).subscribe((tvShow: Show) => {
          expect(tvShow).toEqual(show);
        });
      }));
  });
});
