import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { emailValidator } from 'src/app/shared/validators';
import { HttpClient } from '@angular/common/http';


import { AuthService } from '../../shared/services/auth.service';
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore, collection, doc } from "firebase/firestore";


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

  commentForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, emailValidator(['bg', 'com'])]],
    comment: ['', [Validators.required]],
  });

  constructor(private router: Router, private HttpClient: HttpClient, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private authService: AuthService) {

  }

  contactHandler(): void {

    if (this.commentForm.invalid) {
      return;
    }

    const fs = getFirestore();
    const newRef = doc(collection(fs, "comments"));
    const db = getDatabase();
    set(ref(db, 'comments/' + newRef.id), this.commentForm.value);
    this.authService.readCommentDataFromDB(newRef.id);

    this.router.navigate(['/views/commentMessage']);

  }

}
