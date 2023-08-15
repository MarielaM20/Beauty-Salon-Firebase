import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-haircut',
  templateUrl: './haircut.component.html',
  styleUrls: ['./haircut.component.scss']
})
export class HaircutComponent {

  constructor(private authService: AuthService, private router: Router) { }

  get isLoggedIn(){
    return this.authService.isLoggedIn;
  }

}
