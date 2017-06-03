import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, Nav } from "ionic-angular";
import { HomePage } from "../home/home";
import { OffersPage } from "../offers/offers";
@Component({
    selector: "page-menu",
    templateUrl: "menu.html"
})
export class MenuPage {
    @ViewChild(Nav)
    nav: Nav;
    rootPage: any = HomePage;
    pages: Array<{ title: string, component: any }>;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.pages = [{ title: "Home", component: HomePage },
        { title: "Offers", component: OffersPage },
        { title: "Login", component: HomePage }];
    }
    openPage(page: any) { this.nav.setRoot(page.component); }
}