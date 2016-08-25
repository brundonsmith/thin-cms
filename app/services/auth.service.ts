import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { NotificationService } from './notification.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private apiBaseUrl: string = 'http://localhost:8001/api';

  constructor(private http: Http, private notificationService: NotificationService) { }

  login(username, password) {
    return this.http.put(this.apiBaseUrl + '/login', { username: username, password: password }, { withCredentials: true })
               .toPromise()
               .then(response => response.json())
               .catch(error => {
                 this.notificationService.showNotification('Error: ' + error, 'error');
                 return Promise.reject(error.message || error);
               });
  }
  logout() {
    return this.http.put(this.apiBaseUrl + '/logout', { withCredentials: true })
               .toPromise()
               .catch(error => {
                 this.notificationService.showNotification('Error: ' + error, 'error');
                 return Promise.reject(error.message || error);
               });
  }

}
