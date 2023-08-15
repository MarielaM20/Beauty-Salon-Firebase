import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';


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
    return this.authService.userData;
  }
  
  constructor(private authService: AuthService, private router: Router) { }


}
