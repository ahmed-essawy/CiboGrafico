import { Component } from "@angular/core";
import { NavController, NavParams, MenuController, App } from "ionic-angular";
import { MenuPage } from "../menu/menu";
import { LocationPage } from "../location/location";
/*
  Generated class for the intro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
        selector: "page-intro",
        templateUrl: "intro.html"
    })
export class IntroPage {
    appCtrl: any;
    slideData = [{ image: "1.jpg" }, { image: "2.jpg" }, { image: "3.jpg" }];
    constructor(public navCtrl: NavController, public navParams: NavParams, private app: App) {}
    goToLocationPage() { this.app.getRootNav().setRoot(LocationPage); }
}