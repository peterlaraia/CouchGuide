import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, URLSearchParams } from '@angular/http';

import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Show } from '../models/show';

interface SearchResult {
  score: number;
  show: Show;
}

@Injectable()
export class SearchService {

  constructor(private http: Http) { }

  search(query: string): Observable<Show[]> {
    const params: URLSearchParams = new URLSearchParams();
    params.append('q', query);
    const options: RequestOptionsArgs = { search: params };
    return this.http.get(`${environment.maze_api_url}/search/shows`, options)
      .map((res: Response) => res.json())
      .map((results: SearchResult[]) => results.map((result: SearchResult) => result.show));
  }

}
