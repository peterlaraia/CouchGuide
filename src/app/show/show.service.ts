import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Show } from '../models/show';
import { environment } from '../../environments/environment';

@Injectable()
export class ShowService {

  constructor(private http: Http) { }

  getShow(id: number): Observable<Show> {
    return this.http.get(`${environment.maze_api_url}/shows/${id}`)
      .map((res: Response) => res.json());
  }

}
