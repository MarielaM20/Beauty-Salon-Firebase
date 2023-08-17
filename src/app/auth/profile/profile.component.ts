import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { emailValidator } from 'src/app/shared/validators';
import { AuthService } from '../../shared/services/auth.service';
//import { HttpClient } from '@angular/common/http';
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore, collection, doc } from "firebase/firestore";

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

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.formData.setValue(this.user);
  }


  appointmentHandler(): void {
    if (this.formAppointment.invalid) {
      return;
    }

    const fs = getFirestore();
    const newRef = doc(collection(fs, "appointments"));
    const db = getDatabase();
    set(ref(db, 'appointments/' + newRef.id), this.formAppointment.value);
    this.authService.readAppointmentDataFromDB(newRef.id);

    this.router.navigate(['/views/appointmentMessage']);
  }

  showEditMode = false;

  get user() {
    const { firstName, lastName, email, phone } = this.authService.userData!;
    return {
      firstName,
      lastName,
      email,
      phone
    };
  }

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

    let userId: string = this.authService.getCurrentUserId();
    //console.log('userID',userId);
    //console.log('form data');
    //console.log(this.formData.value);
    this.authService.writeUserDataToDB(
      userId,
      this.formData.value.email || '',
      this.formData.value.firstName || '',
      this.formData.value.lastName || '',
      this.formData.value.phone || ''
    )

    this.authService.readUserDataFromDB(userId);

    this.toggleEditMode();
  }

}
