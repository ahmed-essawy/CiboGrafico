import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, Nav } from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import { AboutPage } from "../about/about";
/*
  Generated class for the menu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: "page-menu",
    templateUrl: "menu.html"
})
export class MenuPage {
    @ViewChild(Nav)
    nav: Nav;
    rootPage: any = TabsPage;
    pages: Array<{ title: string, component: any }>;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        // used for an example of ngFor and navigation
        this.pages = [
            { title: "Page One", component: TabsPage },
            { title: "Page Two", component: AboutPage }
        ];
    }
    openPage(page: any) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}