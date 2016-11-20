import { Component } from '@angular/core';
import { ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import firebase from 'firebase';

@Component({
  selector: 'page-image-modal',
  templateUrl: 'image-modal.html'
})
export class ImageModalPage {
  label: string;
  image: string; //base64 string

  userId;
  storageRef: any;

  loading: any;

  constructor(public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
    this.userId = firebase.auth().currentUser.uid;
    this.storageRef = firebase.storage().ref();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  getImage() {
    return "data:image/jpeg;base64," + this.image;
  }

  delete() {
    this.image = '';
  }

  takePicture() {
    this.getPicture(1);
  }

  choosePicture() {
    this.getPicture(0);
  }

  save(label: string) {
    this.loading = this.loadingCtrl.create({
      content: 'Uploading image...'
    });
    this.loading.present();

    let imgName = new Date().getTime() + '.jpg';
    let imgRef = this.storageRef.child(`images/${imgName}`);
    let uploadTask = imgRef.putString(this.image, 'base64');
    uploadTask.on('state_changed',
      () => {},
      (err) =>  this.handleError(err),
      () => {
        let newImageRef = firebase.database().ref(`/userProfile/${this.userId}/gallery`).push();
        newImageRef.set({
          label: label,
          image_url: uploadTask.snapshot.downloadURL
        }).then(() => {
          this.loading.dismiss();
          let alert = this.alertCtrl.create({
            message: 'Image was successfully uploaded',
            buttons: [{
              text: 'Ok',
              handler: () => {
                this.close();
              }
            }]
          });
          alert.present();
        }, (err) =>  this.handleError(err))
      });
  }

  private handleError(error: any) {
    let alert = this.alertCtrl.create({
      message: (error && error.message) || 'An error occurred',
      buttons: [{
        text: 'Ok',
        role: 'cancel'
      }]
    });
    alert.present();
  }

  private getPicture(source: number) {
    Camera.getPicture({
      sourceType: source,
      destinationType: 0,
      encodingType: 0,   // jpeg
      mediaType: 0,      // image
      saveToPhotoAlbum: false,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.image = imageData;
    }, (err) => this.handleError(err));
  }

}
