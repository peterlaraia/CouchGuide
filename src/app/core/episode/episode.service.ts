import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Episode } from '../../models/episode';
import { environment } from '../../../environments/environment';
import { SslService } from '../ssl/ssl.service';
import { DateUtilsService } from "../date/date-utils.service";

@Injectable()
export class EpisodeService {

  constructor(private http: HttpClient, private sslService: SslService, private dateUtils: DateUtilsService) { }

  getEpisode(id: number): Observable<Episode> {
    return this.getEpisodeByUrl(`${environment.maze_api_url}/episodes/${id}`);
  }

  getEpisodeByUrl(url: string): Observable<Episode> {
    const httpsUrl: string = this.sslService.toHttps(url);
    return this.http.get<Episode>(httpsUrl);
  }

  getSchedule(date = new Date(), country = 'US'): Observable<Episode[]> {
    const isoStr = this.dateUtils.dateFromTimezoneOffset(date).toISOString();
    const dateStr = isoStr.substring(0, isoStr.indexOf('T'));
    console.log(dateStr);
    return this.http.get<Episode[]>(`${environment.maze_api_url}/schedule`, {
      params: new HttpParams().set('date', dateStr).set('country', country)
    });
  }

}
