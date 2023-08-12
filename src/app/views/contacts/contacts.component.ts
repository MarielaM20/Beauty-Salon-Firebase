import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { emailValidator } from 'src/app/shared/validators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

  form = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, emailValidator(['bg', 'com'])]],
    comment: ['', [Validators.required]],
  });

  constructor(private router: Router, private HttpClient: HttpClient, private fb: FormBuilder, private activatedRoute: ActivatedRoute) {

  }

  contactHandler(): void {

    if (this.form.invalid) {
      return;
    }

    this.HttpClient.post("https://beauty-salon-firebase-default-rtdb.europe-west1.firebasedatabase.app/comments.json",
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
  }

}
