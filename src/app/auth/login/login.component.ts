import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { Database, set, ref, update, onValue } from '@angular/fire/database';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword
} from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCotSpP3ttxqsKrJQnNZX6TMwytS2TehDI",
  authDomain: "beauty-salon-firebase.firebaseapp.com",
  databaseURL: "https://beauty-salon-firebase-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "beauty-salon-firebase",
  storageBucket: "beauty-salon-firebase.appspot.com",
  messagingSenderId: "128966032119",
  appId: "1:128966032119:web:7c90d9e181d0af0d6e71f2"
});

const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9090");

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService) {
    //private database: Database,
  }

  ngOnInit(): void { }

  loginHandler(form: NgForm) {

    // const starCountRef = ref(this.database, 'users/' + form.value.email);
    // onValue(starCountRef, (snapshot)=>{
    //   const data = snapshot.val();
    //   console.log(data);

    //   alert(data.firstName);
    // })

    let firstName = form.value.name;

    const loginEmailPassword = async () => {
      const loginEmail = form.value.email;
      const loginPassword = form.value.password;

      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(userCredential.user);
    }

    loginEmailPassword();


    this.httpClient
      .get(
        'https://beauty-salon-firebase-default-rtdb.europe-west1.firebasedatabase.app/users.json',
        //'https://angular-crypto-test-default-rtdb.firebaseio.com/users.json',
        {
          params: new HttpParams()
            //.set('orderBy', '"email"')
            .set('equalTo', `"${form.value.email}"`)

        },
      )
      .subscribe((user) => {
        console.log(user)
      });

    this.authService.user = {
      firstName: form.value.name
    } as any;


    const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigate([returnUrl]);

  }

}
