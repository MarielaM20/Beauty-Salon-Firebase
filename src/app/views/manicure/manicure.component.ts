import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-manicure',
  templateUrl: './manicure.component.html',
  styleUrls: ['./manicure.component.scss']
})
export class ManicureComponent{

  constructor(private authService: AuthService, private router: Router) { }


  get isLoggedIn(){
    return this.authService.isLoggedIn;
  }

}
