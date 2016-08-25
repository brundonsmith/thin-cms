import { Injectable, Output, EventEmitter } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class NotificationService {

  @Output() notificationEvent: EventEmitter<any> = new EventEmitter<any>();

  public showNotification(message:string, type:string = 'neutral') {
    this.notificationEvent.emit({
      message: message,
      type: type
    })
  }

}
