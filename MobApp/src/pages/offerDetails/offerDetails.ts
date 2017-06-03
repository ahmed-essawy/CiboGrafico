import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { HTTP } from "@ionic-native/http";
/*
  Generated class for the offerDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-offerDetails',
    templateUrl: 'offerDetails.html'
})
export class offerDetailsPage {
    offer = [];
    constructor(public navParams: NavParams, public navCtrl: NavController, public http: HTTP) {
        this.offer = navParams.get('offerId');
        //this.http.get("http://localhost:8888/offers/" + navParams.get('offerId'), {}, {})
        //    .then(data => this.offer = JSON.parse(data.data).data)
        //    .catch(err => console.log(`Error: ${err}`));
    }
}