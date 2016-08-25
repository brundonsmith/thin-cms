import { Component, HostBinding } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  moduleId: module.id,
  selector: 'toast-notification',
  templateUrl: 'toast-notification.component.html',
  styleUrls: ['toast-notification.component.css'],
  providers: [ ]
})
export class ToastNotificationComponent {

  active: boolean = false;
  message: string = '';
  type: string = 'neutral';

  @HostBinding('class.active') get isActive() { return this.active };
  @HostBinding('class.neutral') get isTypeNeutral() { return this.type === 'neutral' };
  @HostBinding('class.confirm') get isTypeConfirm() { return this.type === 'confirm' };
  @HostBinding('class.error') get isTypeError() { return this.type === 'error' };

  constructor(
    private notificationService: NotificationService
  ) {
    notificationService.notificationEvent.subscribe((event) => {
      this.message = event.message;
      this.type = event.type;
      this.active = true;
      setTimeout(() => {
        this.active = false;
      }, 3000);
    });
  }

}
