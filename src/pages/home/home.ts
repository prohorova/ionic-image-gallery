import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';
import { DocsPage } from '../docs/docs';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loading: any;
  username: string;

  constructor(public navCtrl: NavController,
              public authData: AuthData,
              public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();

    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        firebase.database().ref(`/userProfile/${currentUser.uid}/email`).on('value', (snapshot) => {
          this.username = snapshot.val();
          this.loading.dismiss();
        });
      }
    });
  }

  logMeOut() {
    this.authData.logoutUser().then( () => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  goToDocs() {
    this.navCtrl.push(DocsPage);
  }

}
