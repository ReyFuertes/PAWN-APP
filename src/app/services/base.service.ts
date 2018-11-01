import { HttpClient,  HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

export abstract class BaseService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  protected getAPIBaseUrl(route: string = ""): string {
    return this.baseUrl + route;
  }

  public commonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': '', //needs to implement auth token here
    });
  }

  public get<T>(route: string, params: any) {
    let url = this.getAPIBaseUrl() + route;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<T>(url, {
      params: params,
      headers: headers
    });
  }

  public post(route: string, object: any): Observable < any > {
    return this.http.post(this.getAPIBaseUrl(route), this.serialize(object), {
      headers: this.commonHeaders()
    });
  }

  public update(route: string, object: any): Observable < any > {
    return this.http.patch(this.getAPIBaseUrl(route), object, {
      headers: this.commonHeaders()
    });
  }

  public delete(route: string): Observable < any > {
    return this.http.delete(this.getAPIBaseUrl(route), {
      headers: this.commonHeaders()
    });
  }

  public put(route: string, object: any, excluder: (key: string, value: any) => any = null): Observable < any > {
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

  public handleError = (error: any) => {
    let errMsg = error.message;

    if (error.status == 401) {} else if (error._body != null && error._body != "") {
      var body = error.json();
      if (typeof body === "string") {
        return Observable.throw(body);
      } else if (body.HasError && body.ErrorMessage != "") {
        return Observable.throw(body.ErrorMessage);
      } else if (body.Message != null && body.Message.length > 0) {
        errMsg = body.Message;
      }
    } else if (error.status == 500) { // if no error message was sent, but a server error was still detected
      return Observable.throw(error.statusText);
    } else if (error.status == 400) {
      return Observable.throw(errMsg);
    } else if (typeof error == "string" && error.indexOf("Bad Request") >= 0) {
      return Observable.throw(error);
    }

    if (errMsg == null || errMsg.length < 1)
      errMsg = error.status ?
      `${error.status} - ${error.statusText}` :
      "Server error";

    return Observable.throw(errMsg);
  };
}