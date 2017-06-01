import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, Nav } from "ionic-angular";
import { HomePage } from "../home/home";
import { LoginPage } from "../login/login";
@Component({
    selector: "page-menu",
    templateUrl: "menu.html"
})
export class MenuPage {
    @ViewChild(Nav)
    nav: Nav;
    rootPage: any = HomePage;
    pages: Array<{ title: string, component: any }>;
    constructor(private navCtrl: NavController, private navParams: NavParams) {
        this.pages = [{ title: "Home", component: HomePage }, { title: "Login", component: LoginPage }];
    }
    openPage(page: any) { this.nav.push(page.component); }
}