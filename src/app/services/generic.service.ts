import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { ImageResponse } from '../models/image.model';

@Injectable()
export class GenericService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getOne(endpoint: string, id: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('id', id);
    return this.get(endpoint, { params: params });
  }

  protected paginate<T>(endpoint: string, urlOrFilter?: string | object): Observable<T> {
    return this.get(endpoint, { params: this.getParams(endpoint, urlOrFilter) });
  }
  
  protected save<T>(endpoint: string, model: Object): Observable<T> {
    return this.post(endpoint, model).pipe(map((response: T) => response ));
  }

  protected edit<T>(endpoint: string, id: string): Observable<T> {
    let params = new HttpParams();
    params = params.set('id', id);
    return this.get(endpoint, { params: params });
  }

  public uploadImage(form: any, categoryPath: string): Observable<ImageResponse> {
    return this.upload(`image/upload/${categoryPath}`, form);
  }

  protected getImage(path: string): any {
    return this.get(path, {});
  }

  protected remove(endpoint: string): Observable<any> {
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
}
