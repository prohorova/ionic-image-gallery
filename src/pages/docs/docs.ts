import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import firebase from 'firebase';

import { ImageModalPage } from '../image-modal/image-modal';
import { ShowImageModalPage } from '../show-image-modal/show-image-modal';

@Component({
  selector: 'page-docs',
  templateUrl: 'docs.html'
})
export class DocsPage {
  docs: any[] = [];
  layout = 'list';

  constructor(public modalCtrl: ModalController) {}

  ionViewDidLoad() {

    let currentUser = firebase.auth().currentUser;

    firebase.database().ref(`/userProfile/${currentUser.uid}/gallery`).on('child_added', (snapshot) => {
      this.docs.unshift(snapshot.val());
    });
  }

  add() {
    let modal = this.modalCtrl.create(ImageModalPage, {}, {showBackdrop: true, enableBackdropDismiss: false});
    modal.present();
  }

  changeLayout(layout: string) {
    this.layout = layout;
  }

  showImage(doc: any) {
    let modal = this.modalCtrl.create(ShowImageModalPage,
      {image_url: doc.image_url, label: doc.label},
      {showBackdrop: true, enableBackdropDismiss: true}
    );
    modal.present();
  }

  showLayout(layout: string) {
    return layout == this.layout;
  }

}
