import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CrudService {

  private apiBaseUrl: string = 'http://localhost:8001/api';

  constructor(private http: Http) { }

  create(modelName) {
    return this.http.post(this.apiBaseUrl + '/' + modelName, { }, { withCredentials: true })
               .toPromise()
               .then(response => response.json() as {})
               .catch(this.handleError);
  }

  read(modelName, objectId) {
    return this.http.get(this.apiBaseUrl + '/' + modelName + '/' + objectId, { withCredentials: true })
               .toPromise()
               .then(response => response.json() as {})
               .catch(this.handleError);
  }

  update(modelName, objectId, data) {
    return this.http.put(this.apiBaseUrl + '/' + modelName + '/' + objectId, data, { withCredentials: true })
               .toPromise()
               .catch(this.handleError);
  }

  delete(modelName, objectId) {
    return this.http.delete(this.apiBaseUrl + '/' + modelName + '/' + objectId, { withCredentials: true })
               .toPromise()
               .catch(this.handleError);
  }

  readSchema(modelName) {
    return this.http.get(this.apiBaseUrl + '/' + modelName, { withCredentials: true })
               .toPromise()
               .then(response => response.json() as {})
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
