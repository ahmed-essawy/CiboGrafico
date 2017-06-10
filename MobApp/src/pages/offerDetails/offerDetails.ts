import { Component } from "@angular/core";
import { NavParams, NavController } from "ionic-angular";
import { TraditionalMenuPage } from "../traditionalMenu/traditionalMenu";
@Component({
    selector: "page-offerDetails",
    templateUrl: "offerDetails.html"
})
export class offerDetailsPage {
    offer: any;
    constructor(private navParams: NavParams, private navCtrl: NavController) {
        this.offer = navParams.get("data");
    }
    Order(restId: any) {
        this.navCtrl.push(TraditionalMenuPage, { Id: restId });
    }
}