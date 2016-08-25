import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { NotificationService } from './notification.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CrudService {

  private apiBaseUrl: string = 'http://localhost:8001/api';

  constructor(private http: Http, private notificationService: NotificationService) { }

  create(modelName) {
    return this.http.post(this.apiBaseUrl + '/' + modelName, { }, { withCredentials: true })
               .toPromise()
               .then(response => response.json() as {})
               .catch(error => {
                 this.notificationService.showNotification('Error: ' + error, 'error');
                 return Promise.reject(error.message || error);
               });
  }

  read(modelName, objectId) {
    return this.http.get(this.apiBaseUrl + '/' + modelName + '/' + objectId, { withCredentials: true })
               .toPromise()
               .then(response => response.json() as {})
               .catch(error => {
                 this.notificationService.showNotification('Error: ' + error, 'error');
                 return Promise.reject(error.message || error);
               });
  }

  update(modelName, objectId, data) {
    return this.http.put(this.apiBaseUrl + '/' + modelName + '/' + objectId, data, { withCredentials: true })
               .toPromise()
               .catch(error => {
                 this.notificationService.showNotification('Error: ' + error, 'error');
                 return Promise.reject(error.message || error);
               });
  }

  delete(modelName, objectId) {
    return this.http.delete(this.apiBaseUrl + '/' + modelName + '/' + objectId, { withCredentials: true })
               .toPromise()
               .catch(error => {
                 this.notificationService.showNotification('Error: ' + error, 'error');
                 return Promise.reject(error.message || error);
               });
  }

  readSchema(modelName) {
    return this.http.get(this.apiBaseUrl + '/' + modelName, { withCredentials: true })
               .toPromise()
               .then(response => response.json() as {})
               .catch(error => {
                 this.notificationService.showNotification('Error: ' + error, 'error');
                 return Promise.reject(error.message || error);
               });
  }

}
