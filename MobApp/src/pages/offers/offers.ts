import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Offers } from "../../providers/offers";
import { offerDetailsPage } from "../offerDetails/offerDetails";
import { Utilities } from "../../providers/utilities";
@Component({
    selector: "page-offers",
    templateUrl: "offers.html"
})
export class OffersPage {
    offers: any;
    constructor(private offer: Offers, private navCtrl: NavController) {
        Utilities.showLoader();
        this.offer.readAll().then(resp => {
            this.offers = resp.response;
            Utilities.hideLoader();
        }).catch(err => { navCtrl.pop(); Utilities.hideLoader(); Utilities.showToast("Failed to retrieve data.") });
    }
    selectOffer(offerId: string) {
        this.navCtrl.push(offerDetailsPage, { Id: offerId });
    }
}