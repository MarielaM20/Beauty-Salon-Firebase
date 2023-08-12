import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-makeup',
  templateUrl: './makeup.component.html',
  styleUrls: ['./makeup.component.scss']
})
export class MakeupComponent {

  constructor(private authService: AuthService, private router: Router) { }

  get isLoggedIn(){
    return this.authService.isLoggedIn;
  }

}
