import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  
  get isLoggedIn(){
    return this.authService.isLoggedIn;
  }
  
  get user(){
    return this.authService.user;
  }
  
  constructor(private authService: AuthService, private router: Router) { }


}
