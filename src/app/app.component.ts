import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';


import firebase from 'firebase';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {

    const config = {
      apiKey: "AIzaSyDxKZSiqTu7Pgw0BNK-w_aP2JJhASJRqKA",
      authDomain: "ionic-test-2e369.firebaseapp.com",
      databaseURL: "https://ionic-test-2e369.firebaseio.com",
      storageBucket: "ionic-test-2e369.appspot.com",
      messagingSenderId: "719522226667"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged( user => {
      if (!user) {
        this.rootPage = LoginPage;
        console.log("There's not a logged in user!");
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
