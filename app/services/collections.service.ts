import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { NotificationService } from './notification.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CollectionsService {

  private apiBaseUrl: string = 'http://localhost:8001/api';

  constructor(private http: Http, private notificationService: NotificationService) { }

  getAllCollections() {
    return this.http.get(this.apiBaseUrl + '/collections', { withCredentials: true })
              .toPromise()
              .then(response => response.json() as [])
              .catch(error => {
                this.notificationService.showNotification('Error: ' + error, 'error');
                return Promise.reject(error.message || error);
              });
  }

  search(modelName, searchOptions) {
    /*
    searchOptions: {
      searchString: 'my search',
      sortField: 'myField',
      sortDirection: 'asc'
    }
    */

    return this.http.get(this.apiBaseUrl + '/search/' + modelName + this.toQueryString(searchOptions), { withCredentials: true })
              .toPromise()
              .then(response => response.json() as [])
              .catch(error => {
                this.notificationService.showNotification('Error: ' + error, 'error');
                return Promise.reject(error.message || error);
              });
  }

  private toQueryString(obj) {
    var parts = [];
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
        }
    }
    return '?' + parts.join("&");
  }


}
