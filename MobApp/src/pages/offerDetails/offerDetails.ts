import { Component } from "@angular/core";
import { NavParams, NavController } from "ionic-angular";
@Component({
    selector: "page-offerDetails",
    templateUrl: "offerDetails.html"
})
export class offerDetailsPage {
    offer: any;
    constructor(public navParams: NavParams, public navCtrl: NavController) { this.offer = navParams.get("data"); }
}