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

import { EpisodeService } from './episode.service';
import { Episode } from '../../models/episode';
import { CoreModule } from '../../core/core.module';

describe('EpisodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, CoreModule],
      providers: [
        EpisodeService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  describe('getEpisode()', () => {
    it('should fetch an episode by id', inject([EpisodeService, XHRBackend],
      (service: EpisodeService, backend: MockBackend) => {
        const episode: Episode = {
          id: 1, name: 'episode'
        };

        backend.connections.subscribe((c: MockConnection) => {
          expect(c.request.url).toContain('/episodes/1');
          expect(c.request.method).toBe(RequestMethod.Get);
          c.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(episode)
          })));
        });

        service.getEpisode(1).subscribe((ep: Episode) => {
          expect(ep).toEqual(episode);
        });
      }));
  });

  describe('getEpisodeByUrl()', () => {
    it('should fetch an episode by url', inject([EpisodeService, XHRBackend],
      (service: EpisodeService, backend: MockBackend) => {
        const episode: Episode = {
          id: 1, name: 'episode'
        };

        backend.connections.subscribe((c: MockConnection) => {
          expect(c.request.url).toBe('url/episodes/1');
          expect(c.request.method).toBe(RequestMethod.Get);
          c.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(episode)
          })));
        });

        service.getEpisodeByUrl('url/episodes/1').subscribe((ep: Episode) => {
          expect(ep).toEqual(episode);
        });
      }));
  });




});
