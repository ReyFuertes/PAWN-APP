import { HttpClient,  HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

export abstract class BaseService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  protected getAPIBaseUrl(route: string = ""): string {
    return this.baseUrl + route;
  }

  protected commonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': '', //needs to implement auth token here
    });
  }

  protected get<T>(route: string, params: any) {
    let url = this.getAPIBaseUrl() + route;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<T>(url, {
      params: params,
      headers: headers
    });
  }

  protected post(route: string, object: any, customHeader?: HttpHeaders): Observable < any > {
    debugger
    return this.http.post(this.getAPIBaseUrl(route), object, {
      headers: !customHeader ? this.commonHeaders() : customHeader
    });
  }

  protected update(route: string, object: any): Observable < any > {
    return this.http.patch(this.getAPIBaseUrl(route), object, {
      headers: this.commonHeaders()
    });
  }

  protected delete(route: string): Observable < any > {
    return this.http.delete(this.getAPIBaseUrl(route), {
      headers: this.commonHeaders()
    });
  }

  protected put(route: string, object: any, excluder: (key: string, value: any) => any = null): Observable < any > {
    return this.http.put(this.getAPIBaseUrl(route), this.serialize(object, excluder), {
      headers: this.commonHeaders()
    });
  }

  private serialize(object: any, excluder: (key: string, value: any) => any = null): string {
    try {
      return JSON.stringify(object, excluder);
    } catch (err) {
      throw err;
    }
  }

}