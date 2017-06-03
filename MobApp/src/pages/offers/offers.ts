import { Component } from '@angular/core';
import { HTTP } from "@ionic-native/http";
import { NavController } from 'ionic-angular';
import { offerDetailsPage } from "../offerDetails/offerDetails";
@Component({
    selector: 'page-offers',
    templateUrl: 'offers.html'
})
export class OffersPage {
    offers: any;
    constructor(private http: HTTP, private navctrl: NavController) {
        console.log("hello offers");
        this.http.get("http://localhost:8888/offers/Read", {}, {})
            .then(data => {
                this.offers = JSON.parse(data.data).data;
                console.log(this.offers);
            })
            .catch(err => console.log(`Error: ${err}`));
    }
    selectOffer(id) { this.navctrl.push(offerDetailsPage, { offerId: id }); }
}