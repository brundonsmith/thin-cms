import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CollectionsService {

  private apiBaseUrl: string = 'http://localhost:8001/api';

  constructor(private http: Http) { }

  getAllCollections() {
    return this.http.get(this.apiBaseUrl + '/collections')
               .toPromise()
               .then(response => response.json() as [])
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
