import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  get isLoggedIn(){
    return this.authService.isLoggedIn;
  }

  constructor(private authService: AuthService, private router: Router) { }

}
