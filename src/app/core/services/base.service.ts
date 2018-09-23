import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

export abstract class BaseService {
  private baseUrl: string = "http://";

  constructor(private http: HttpClient) {}

  /**
   * api url endpoint
   * @param route
   */
  protected getAPIBaseUrl(route: string = ""): string {
    return this.baseUrl + route;
  }

  public handleError = (error: any) => {
    var isIGenericResponse = false;
    let errMsg = error.message;

    if (error.status == 401) {
      //if you find a 401 logout but keep the URL
    } else if (error._body != null && error._body != "") {
      // if there is content in the body, check for a specific ErrorMessage property and return that
      var body = error.json();

      if (typeof body === "string") {
        console.error(body);
        return Observable.throw(body);
      } else if (body.HasError && body.ErrorMessage != "") {
        console.error(body.ErrorMessage);
        return Observable.throw(body.ErrorMessage);
      } else if (body.Message != null && body.Message.length > 0) {
        errMsg = body.Message;
      }
    } else if (error.status == 500) {
      // if no error message was sent, but a server error was still detected
      return Observable.throw(error.statusText);
    } else if (error.status == 400) {
      if (!isIGenericResponse) {
        errMsg =
          "400 Bad Request error" + (error.error ? ": " + error.error : "");
      }
      return Observable.throw(errMsg);
    } else if (typeof error == "string" && error.indexOf("Bad Request") >= 0) {
      return Observable.throw(error);
    }

    if (errMsg == null || errMsg.length < 1)
      errMsg = error.status
        ? `${error.status} - ${error.statusText}`
        : "Server error";
    return Observable.throw(errMsg);
  };

  /**
   * Makes a _GET HTTP request to the base Endor API
   * 
   * @param {string} route    - The path of the endpoint to be requested
   */
  public get(route: string) {
    let url = this.getAPIBaseUrl() + route;
    
    let headers = new HttpHeaders({
        'Authorization': '',
        'Accept': 'application/json'
    });

    let options = ({headers: headers});
    return this.http.get(url, options);
  }

  public commonStateChangeHeaders(): HttpHeaders{
    return new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': '',
    });
  }

  /**
   * Makes a _POST HTTP request to the base Endor API
   * 
   * @param {string} route    - The path of the endpoint to be requested
   * @param {any} object      - The model to be used in the body of the request
   */
  public post( route: string, object: any, excluder: (key: string, value: any) => any = null): Observable<any> {
    return this.http.post(this.getAPIBaseUrl(route), this.serialize(object, excluder), { headers: this.commonStateChangeHeaders()});
  }

  /**
   * Makes a DELETE HTTP request to the base Endor API
   * 
   * @param {string} route    - The path of the endpoint to be requested
   */
  public delete( route: string): Observable<any> {
      return this.http.delete(this.getAPIBaseUrl(route), { headers: this.commonStateChangeHeaders()});
  }

  /**
   * Makes a _PUT HTTP request to the base Endor API
   * 
   * @param {string} route    - The path of the endpoint to be requested
   * @param {any} object      - The model to be used in the body of the request
   */
  public put( route: string, object: any, excluder: (key: string, value: any) => any = null): Observable<any> {
    return this.http.put(this.getAPIBaseUrl(route), this.serialize(object, excluder), { headers: this.commonStateChangeHeaders()});
  }

  private serialize(object: any, excluder: (key: string, value: any) => any = null): string{
    try {
        return JSON.stringify(object, excluder);
    } catch(err){
        throw err;
    }
  }
  
  public static NewGuid(): string{
      return (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0,3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
  }

  private static S4() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
}
