import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getDatabase, ref, set, onValue } from "firebase/database";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  appointmentData: any;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        //this.userData = user;
        console.log('initializing user', user.uid);
        this.readUserDataFromDB(user.uid);
        //console.log('savign json user');
        //console.log(this.userData);
        //localStorage.setItem('user', JSON.stringify(this.userData));
        //JSON.parse(localStorage.getItem('user')!);
      } else {
        console.log('initializing user', 'NO USER');
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  getCurrentUserId(): string {
    if (this.userData) return this.userData.uid;
    return '';
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        //this.SetUserData(result.user);
        if (result.user) {
          this.readUserDataFromDB(result.user.uid);
          this.afAuth.authState.subscribe((user) => {
            if (user) {
              this.router.navigate(['/']);
            }
          });
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  writeUserDataToDB(userId: string, email: string, firstName: string, lastName: string, phone: string) {
    if (userId == '') return;
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      uid: userId,
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phone
    });
  }

  readUserDataFromDB(userId: string) {
    const db = getDatabase();
    console.log('reading user from DB', userId);
    const userRef = ref(db, 'users/' + userId);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      this.userData = data;
      localStorage.setItem('user', JSON.stringify(this.userData));
      JSON.parse(localStorage.getItem('user')!);
      console.log('user data from DB');
      console.log(data);
    });

  }

  readAppointmentDataFromDB(appointmentId: string) {
    const db = getDatabase();
    console.log('reading appointment from DB', appointmentId);
    const appointmentRef = ref(db, 'appointments/' + appointmentId);
    onValue(appointmentRef, (snapshot) => {
      const data = snapshot.val();
      this.appointmentData = data;
      //localStorage.setItem('user', JSON.stringify(this.appointmentData));
      //JSON.parse(localStorage.getItem('appointment')!);
      console.log('appointment data from DB');
      console.log(data);
    });
  }

  // Sign up with email/password
  SignUp(email: string, password: string, firstName: string, lastName: string, phone: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        //this.SendVerificationMail();
        if (result.user) {
          this.writeUserDataToDB(result.user.uid, email, firstName, lastName, phone);
          this.readUserDataFromDB(result.user.uid);
          let usr: any = {
            uid: result.user.uid,
            email: email,
            firstName: firstName,
            lastName: lastName,
            phone: phone
          }
          //this.SetUserData(usr);
          //console.log('userData saved', result.user.uid);
          this.router.navigate(['/']);
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });


  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    let jsUser: string = localStorage.getItem('user') || '[]';
    //console.log('json storage');
    //console.log(jsUser);
    if (jsUser == 'undefined') jsUser = '[]';
    const user = JSON.parse(jsUser);
    return user !== null /*&& user.emailVerified !== false*/ ? true : false;
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    console.log('setUserData', userRef);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone
      //emailVerified: user.emailVerified,
    };
    console.log('setUserData2', userRef);
    return userRef.set(userData, {
      merge: true,
    });
  }

  SetAppointmentData(appointment: any) {
    const appointmentRef: AngularFirestoreDocument<any> = this.afs.doc(
      `appointments/${appointment.id}`
    );
    console.log('setAppointmentData', appointmentRef);
    const appointmentData: any = {
      id: appointment.id,
      date: appointment.date,
      hour: appointment.hour,
      firstName: appointment.firstName,
      lastName: appointment.lastName,
      service: appointment.service,
      email: appointment.email
    };
    console.log('setAppointmentData2', appointmentRef);
    return appointmentRef.set(appointmentData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    });
  }
}