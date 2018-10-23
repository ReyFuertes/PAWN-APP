import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable()
export class GenericService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public paginate<T>(endpoint: string, urlOrFilter?: string | object): Observable<T> {
    return this.get(endpoint, { params: this.getParams(endpoint, urlOrFilter) });
  }
  
  public save<T>(endpoint: string, model: Object): Observable<T> {
    return this.post(endpoint, model).pipe(map((response: T) => response ));
  }

  public edit<T>(endpoint: string, id: string): Observable<T> {
    let params = new HttpParams();
    params = params.set('id', id);
    return this.get(endpoint, { params: params });
  }

  public remove(endpoint: string, id: number): Observable<any> {
    return this.delete(endpoint).pipe(map((response) => response ));
  }

  private getParams(endpoint, urlOrFilter?: string | Object): string | Object {
    let params = new HttpParams();

    if (typeof urlOrFilter === 'string') { // we were given a page URL, use it
      endpoint += urlOrFilter;
    } else if (typeof urlOrFilter === 'object') { // given filtering criteria, build the query string
      Object.keys(urlOrFilter).sort().forEach(key => {
        const value = urlOrFilter[key];
        if (value !== null) {
          params = params.set(key, value.toString());
        }
      });
    }

    return params;
  }

  private extractData(res:Response) {
    let body = res.json();
    return body || {'error': true};
  }
}