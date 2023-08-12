import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { emailValidator } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {


  formAppointment = this.fb.group({
    date: ['', [Validators.required]],
    hour: ['', [Validators.required]],
    fName: ['', [Validators.required]],
    lName: ['', [Validators.required]],
    service: ['', [Validators.required]],
    email: ['', [Validators.required, emailValidator(['bg', 'com'])]]
  })

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private HttpClient: HttpClient, private authService: AuthService) {
    this.formData.setValue(this.user);
  }


  appointmentHandler(): void {
    if (this.formAppointment.invalid) {
      return;
    }

    this.HttpClient.post("https://beauty-salon-firebase-default-rtdb.europe-west1.firebasedatabase.app/appointments.json",
      this.formAppointment.value
    )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );

    const { firstName, lastName, email, phone } = this.formData.value;

    this.authService.user = {
      firstName, lastName, email, phone
    } as any;

    this.router.navigate(['/views/appointmentMessage']);
  }



  showEditMode = false;

  get user() {
    const { firstName, lastName, email, phone } = this.authService.user!;
    return {
      firstName,
      lastName,
      email,
      phone
    };
  }

  formData = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, emailValidator(['bg', 'com'])]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
  })


  toggleEditMode(): void {
    this.showEditMode = !this.showEditMode;
  }

  saveProfile(): void {
    if (this.formData.invalid) {
      return;
    }

    const { firstName, lastName, email, phone } = this.formData.value;

    this.authService.user = {
      firstName, lastName, email, phone
    } as any;

    this.toggleEditMode();
  }

}
