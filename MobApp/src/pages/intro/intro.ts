import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
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
    slideData = [{ image: "img1.jpg" }, { image: "img2.jpg" }, { image: "img1.jpg" }];
    constructor(public navCtrl: NavController, public navParams: NavParams) { }
    goToLocationPage() { this.navCtrl.push(TabsPage); }
}