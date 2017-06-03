import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, Nav } from "ionic-angular";
import { HomePage } from "../home/home";
import { RestaurantsListPage } from "../RestaurantsList/RestaurantsList";
import { AccountPage } from "../account/account";
@Component({
    selector: "page-menu",
    templateUrl: "menu.html"
})
export class MenuPage {
    @ViewChild(Nav)
    nav: Nav;
    rootPage: any = HomePage;
    constructor(private navCtrl: NavController, private navParams: NavParams) {
        this.pages = [{ title: "Home", component: HomePage },
                { title: "Restaurants", component: RestaurantsListPage },
                { title: "Account", component: AccountPage }];
    }
    openPage(page: any) { this.nav.push(page.component); }
}