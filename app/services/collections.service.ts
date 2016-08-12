import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CollectionsService {

  private apiBaseUrl: string = 'http://localhost:8001/api';

  constructor(private http: Http) { }

  getAllCollections() {
    return this.http.get(this.apiBaseUrl + '/collections', { withCredentials: true })
               .toPromise()
               .then(response => response.json() as [])
               .catch(this.handleError);
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
               .catch(this.handleError);
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

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
