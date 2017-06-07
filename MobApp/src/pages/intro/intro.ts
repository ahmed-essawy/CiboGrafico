import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController, ToastController, App } from "ionic-angular";
import { HomePage } from "../home/home";
import { MenuPage } from "../menu/menu";
import { SQLite } from "@ionic-native/sqlite";
import { Sql } from "../../providers/sql";
import { Utilities } from "../../providers/utilities";
@Component({
    selector: "page-intro",
    templateUrl: "intro.html"
})
export class IntroPage {
    isReady = false;
    slideData = [{ image: "1.jpg" }, { image: "2.jpg" }, { image: "3.jpg" }];
    constructor(private app: App, sql: SQLite, loadingCtrl: LoadingController, toastController: ToastController) { new Sql(sql); new Utilities(loadingCtrl, toastController); this.isReady = true; }
    startApp() { this.app.getRootNav().setRoot(MenuPage); }
}