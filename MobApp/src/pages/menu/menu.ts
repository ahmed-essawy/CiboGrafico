import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, Nav } from "ionic-angular";
import { HomePage } from "../home/home";
import { RestaurantsListPage } from "../RestaurantsList/RestaurantsList";
import { AccountPage } from "../account/account";
import { LoginTabs } from "../loginTabs/loginTabs";
import { OffersPage } from "../offers/offers";
import { Users } from "../../providers/users";
import { Utilities } from "../../providers/utilities";
@Component({
    selector: "page-menu",
    templateUrl: "menu.html"
})
export class MenuPage {
    @ViewChild(Nav)
    nav: Nav;
    rootPage: any = HomePage;
    pages: Array<{ title: string, icon: string, component: any }> = new Array<{ title: string, icon: string, component: any }>();
    constructor(private navCtrl: NavController, private navParams: NavParams) {
        this.pages.push({ title: "Home", icon: "home", component: HomePage });
        this.pages.push({ title: "Restaurants", icon: "restaurant", component: RestaurantsListPage });
        this.pages.push({ title: "Hot Offers", icon: "flash", component: OffersPage });
        Users.isLogged().then(isLogged => {
            if (isLogged) this.loggedIn();
            else this.loggedOut();
        });
        Utilities.eventsCtrl.subscribe("User:Login", res => this.loggedIn());
        Utilities.eventsCtrl.subscribe("User:Logout", res => this.loggedOut());
    }
    openPage(page: any) {
        if (page === this.rootPage) this.nav.setRoot(page);
        else this.nav.setPages([this.rootPage, page]);
    }
    pushPage(page: { title: string, icon: string, component: any }): void {
        let index = this.pages.findIndex(p => p.title === page.title);
        if (index === -1) this.pages.push(page);
    }
    removePage(title: string): void {
        let index = this.pages.findIndex(p => p.title === title);
        if (index !== -1) {
            this.pages.splice(index, 1);
            this.removePage(title);
        }
    }
    loggedIn() {
        this.pushPage({ title: "Profile", icon: "contact", component: AccountPage });
        this.removePage("Login");
    }
    loggedOut() {
        this.pushPage({ title: "Login", icon: "log-in", component: LoginTabs });
        this.removePage("Profile");
    }
}