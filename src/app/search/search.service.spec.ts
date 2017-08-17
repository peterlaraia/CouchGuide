import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'environments/environment';
import { SearchService } from './search.service';
import { Show } from '../models/show';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService]
    });
  });

  describe('search()', () => {
    it('should fetch some search results', inject([SearchService, HttpTestingController],
      (service: SearchService, httpMock: HttpTestingController) => {
        const results: any[] = [
          { score: 27, show: { id: 100 } },
          { score: 13, show: { id: 125 } },
          { score: 7, show: { id: 221 } }
        ];

        service.search('query').subscribe((shows: Show[]) => {
          expect(shows).toEqual([{ id: 100 }, { id: 125 }, { id: 221 }]);
        });

        const req = httpMock.expectOne(`${environment.maze_api_url}/search/shows?q=query`);
        expect(req.request.method).toEqual('GET');
        req.flush(results);
        httpMock.verify();
      }
    ));
  });


});
