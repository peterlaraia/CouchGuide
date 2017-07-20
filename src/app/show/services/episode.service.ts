import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Episode } from '../../models/episode';
import { environment } from '../../../environments/environment';
import { SslService } from '../../core/ssl/ssl.service';

@Injectable()
export class EpisodeService {

  constructor(private http: Http, private sslService: SslService) { }

  getEpisode(id: number): Observable<Episode> {
    return this.getEpisodeByUrl(`${environment.maze_api_url}/episodes/${id}`);
  }

  getEpisodeByUrl(url: string): Observable<Episode> {
    const httpsUrl: string = this.sslService.toHttps(url);
    return this.http.get(httpsUrl)
      .map(res => res.json());
  }

}
