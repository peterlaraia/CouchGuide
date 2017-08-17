import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'environments/environment';
import { Show } from '../../models/show';
import { ShowService } from './show.service';

describe('ShowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShowService]
    });
  });

  describe('getShow()', () => {
    it('should retrieve a show', inject([ShowService, HttpTestingController],
      (service: ShowService, httpMock: HttpTestingController) => {
        const show = {
          id: 1, name: 'television show'
        };

        service.getShow(1).subscribe((tvShow: Show) => {
          expect(tvShow).toEqual(show);
        });

        const req = httpMock.expectOne(`${environment.maze_api_url}/shows/1`);
        expect(req.request.method).toEqual('GET');
        req.flush(show);
        httpMock.verify();
      }));
  });
});
