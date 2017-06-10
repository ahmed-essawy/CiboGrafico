﻿import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Offers } from "../../providers/offers";
import { offerDetailsPage } from "../offerDetails/offerDetails";
@Component({
    selector: "page-offers",
    templateUrl: "offers.html"
})
export class OffersPage {
    offers: any;
    constructor(private offer: Offers, private navctrl: NavController) {
        this.offer.readAll().then(resp => this.offers = resp.response).catch(err => console.log(err));
    }
    selectOffer(offerId: string) { this.navctrl.push(offerDetailsPage, { Id: offerId }); }
}