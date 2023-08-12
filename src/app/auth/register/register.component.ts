import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { emailValidator } from 'src/app/shared/validators';
import { sameValueGroupValidator } from 'src/app/shared/validators/same-value-group-validator';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, emailValidator(['bg', 'com'])]],
    tel: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    pass: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: [sameValueGroupValidator('password', 'rePassword')]
    })
  });

  constructor(private router: Router, private HttpClient: HttpClient, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private authService: AuthService) {

  }

  registerHandler(): void {

    if (this.form.invalid) {
      return;
    }

    // const { firstName, lastName, email, tel, pass: { password, rePassword } = {} } = this.form.value;
    // this.authService.register(firstName!, lastName!, email!, tel!, password!, rePassword!)
    // .subscribe(res => console.log(res));

    this.HttpClient.post("https://beauty-salon-firebase-default-rtdb.europe-west1.firebasedatabase.app/users.json",
      this.form.value
    )
    .subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );

    this.authService.user = {
      firstName: this.form.get('firstName')?.value
    } as any;

    const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigate([returnUrl]);

  }


}
