// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


// export const environment = {
//   production: false,
//   apiURL: 'https://jsonplaceholder.typicode.com'
// };


export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCotSpP3ttxqsKrJQnNZX6TMwytS2TehDI",
    authDomain: "beauty-salon-firebase.firebaseapp.com",
    databaseURL: "https://beauty-salon-firebase-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "beauty-salon-firebase",
    storageBucket: "beauty-salon-firebase.appspot.com",
    messagingSenderId: "128966032119",
    appId: "1:128966032119:web:7c90d9e181d0af0d6e71f2"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
