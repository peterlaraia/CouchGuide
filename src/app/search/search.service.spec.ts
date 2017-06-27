import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Headers, HttpModule, RequestMethod, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { SearchService } from './search.service';
import { Show } from "../models/show";

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        SearchService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  describe('search()', () => {
    it('should fetch some search results', inject([SearchService, XHRBackend], (service: SearchService, backend: MockBackend) => {
      const results: any[] = [
        {score: 27, show: {id: 100}},
        {score: 13, show: {id: 125}},
        {score: 7, show: {id: 221}}
      ]
      backend.connections.subscribe((c: MockConnection) => {
        expect(c.request.url).toContain('/search/shows?q=query');
        expect(c.request.method).toBe(RequestMethod.Get);
        c.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(results)
        })));
      });

      service.search('query').subscribe((shows: Show[]) => {
        expect(shows).toEqual([{id: 100}, {id: 125}, {id: 221}]);
      });
    }));
  })


});
