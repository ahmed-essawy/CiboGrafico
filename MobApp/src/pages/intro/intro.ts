import { Component } from "@angular/core";
import { NavController, NavParams, App, Platform } from "ionic-angular";
import { HomePage } from "../home/home";
import { MenuPage } from "../menu/menu";
@Component({
        selector: "page-intro",
        templateUrl: "intro.html"
    })
export class IntroPage {
    isReady = false;
    slideData = [{ image: "1.jpg" }, { image: "2.jpg" }, { image: "3.jpg" }];
    constructor(platform: Platform, private app: App) {
        platform.ready().then(() => this.isReady = true).catch(err => console.log(`Error: ${err}`));
    }
    startApp() { this.app.getRootNav().setRoot(MenuPage); }
}