import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  search(query: string): Observable<Show[]> {
    return this.http.get<SearchResult[]>(`${environment.maze_api_url}/search/shows`, {
      params: new HttpParams().set('q', query)
    })
      .map((results: SearchResult[]) => results.map((result: SearchResult) => result.show));
  }

}
