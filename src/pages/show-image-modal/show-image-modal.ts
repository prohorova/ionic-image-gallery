import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-show-image-modal',
  templateUrl: 'show-image-modal.html'
})
export class ShowImageModalPage {

  image_url: string;
  label: string;

  constructor(public viewCtrl: ViewController,
              public params: NavParams) {
    this.image_url = params.get('image_url');
    this.label = params.get('label');
  }

  close() {
    this.viewCtrl.dismiss();
  }


}
