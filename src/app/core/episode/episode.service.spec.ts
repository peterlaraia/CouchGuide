import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoreModule } from '../../core/core.module';
import { SslService } from '../../core/ssl/ssl.service';
import { environment } from 'environments/environment';
import { EpisodeService } from './episode.service';
import { Episode } from '../../models/episode';

describe('EpisodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EpisodeService, SslService]
    });
  });

  describe('getEpisode()', () => {
    it('should fetch an episode by id', inject([EpisodeService, HttpTestingController],
      (service: EpisodeService, httpMock: HttpTestingController) => {
        const episode: Episode = {
          id: 1, name: 'episode'
        };

        service.getEpisode(1).subscribe((ep: Episode) => {
          expect(ep).toEqual(episode);
        });

        const req = httpMock.expectOne(`https://api.tvmaze.com/episodes/1`);
        expect(req.request.method).toEqual('GET');
        req.flush(episode);
        httpMock.verify();
      }));
  });

  describe('getEpisodeByUrl()', () => {
    it('should fetch an episode by url', inject([EpisodeService, HttpTestingController],
      (service: EpisodeService, httpMock: HttpTestingController) => {
        const episode: Episode = {
          id: 1, name: 'episode'
        };

        service.getEpisodeByUrl('url/episodes/1').subscribe((ep: Episode) => {
          expect(ep).toEqual(episode);
        });

        const req = httpMock.expectOne(`url/episodes/1`);
        expect(req.request.method).toEqual('GET');
        req.flush(episode);
        httpMock.verify();
      }));
  });

  describe('getSchedule()', () => {
    it('should fetch the schedule', inject([EpisodeService, HttpTestingController],
      (service: EpisodeService, httpMock: HttpTestingController) => {
        const episodes: Episode[] = [
          {id: 1, name: 'ep1'},
          {id: 2, name: 'ep2'},
          {id: 3, name: 'ep3'}
        ];

        service.getSchedule(new Date('2016-03-18'), 'US').subscribe((eps: Episode[]) => {
          expect(eps).toEqual(episodes);
        });

        const req = httpMock.expectOne(`http://api.tvmaze.com/schedule?date=2016-03-18&countrycode=US`);
        expect(req.request.method).toEqual('GET');
        req.flush(episodes);
        httpMock.verify();
      }));
  });
});
