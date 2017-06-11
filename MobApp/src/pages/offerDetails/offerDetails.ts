import { Component } from "@angular/core";
import { NavParams, NavController } from "ionic-angular";
import { TraditionalMenuPage } from "../traditionalMenu/traditionalMenu";
import { Offers } from "../../providers/offers";
@Component({
    selector: "page-offerDetails",
    templateUrl: "offerDetails.html"
})
export class offerDetailsPage {
    offer: any;
    constructor(private navParams: NavParams, private navCtrl: NavController, offerCtrl: Offers) {
        offerCtrl.Read(navParams.get("Id")).then(resp => {
            this.offer = resp.response;
        }).catch(err => console.log(err));
    }
    Order(restId: any) {
        this.navCtrl.push(TraditionalMenuPage, { Id: restId });
    }
}