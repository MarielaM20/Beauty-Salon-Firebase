import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-appointment-message',
  templateUrl: './appointment-message.component.html',
  styleUrls: ['./appointment-message.component.scss']
})
export class AppointmentMessageComponent {

  constructor(private authService: AuthService) { }

  get appointment() {
    const { date, hour, fName, lName, service, email } = this.authService.appointmentData!;
    return {
      date,
      hour,
      fName,
      lName,
      service,
      email
    };
  }

}
