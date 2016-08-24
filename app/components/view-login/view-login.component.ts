import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { InputStringShortComponent } from '../input-string-short/input-string-short.component';
import { ButtonPrimaryComponent } from '../button-primary/button-primary.component';
import { AuthService } from '../../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'view-login',
  templateUrl: 'view-login.component.html',
  styleUrls: ['view-login.component.css'],
  directives: [ InputStringShortComponent, ButtonPrimaryComponent ],
  providers: [ AuthService ]
})
export class ViewLoginComponent {

  username: string;
  password: string;

  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  login() {
    this.authService.login(this.username, this.password)
      .then( response => {
        if(response.loginSuccess) {
          this.router.navigate(['/']);
        } else {
          // toast message
        }
      });
  }

}
