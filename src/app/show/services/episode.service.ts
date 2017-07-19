import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Episode } from '../../models/episode';
import { environment } from 'environments/environment';

@Injectable()
export class EpisodeService {

  constructor(private http: Http) { }

  getEpisode(id: number): Observable<Episode> {
    return this.getEpisodeByUrl(`${environment.maze_api_url}/episodes/${id}`);
  }

  getEpisodeByUrl(url: string): Observable<Episode> {
    return this.http.get(url)
      .map(res => res.json());
  }

}
