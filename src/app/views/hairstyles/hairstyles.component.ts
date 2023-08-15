import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-hairstyles',
  templateUrl: './hairstyles.component.html',
  styleUrls: ['./hairstyles.component.scss']
})
export class HairstylesComponent{

  constructor(private authService: AuthService, private router: Router) { }


  get isLoggedIn(){
    return this.authService.isLoggedIn;
  }

}
