import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private apiBaseUrl: string = 'http://localhost:8001/api';

  constructor(private http: Http) { }

  login(username, password) {
    return this.http.put(this.apiBaseUrl + '/login', { username: username, password: password }, { withCredentials: true })
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }
  logout() {
    return this.http.put(this.apiBaseUrl + '/logout', { withCredentials: true })
               .toPromise()
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
