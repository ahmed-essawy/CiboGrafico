import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { HTTP } from "@ionic-native/http";
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