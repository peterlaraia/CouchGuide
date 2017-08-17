import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Show } from '../../models/show';
import { environment } from '../../../environments/environment';

@Injectable()
export class ShowService {

  constructor(private http: HttpClient) { }

  getShow(id: number): Observable<Show> {
    return this.http.get<Show>(`${environment.maze_api_url}/shows/${id}`);
  }

}
