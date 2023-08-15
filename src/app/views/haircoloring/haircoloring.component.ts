import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-haircoloring',
  templateUrl: './haircoloring.component.html',
  styleUrls: ['./haircoloring.component.scss']
})
export class HaircoloringComponent {

  constructor(private authService: AuthService, private router: Router) { }


  get isLoggedIn(){
    return this.authService.isLoggedIn;
  }

}
