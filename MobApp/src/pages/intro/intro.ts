import { Component } from "@angular/core";
import { NavController, LoadingController, ToastController, Events, AlertController } from "ionic-angular";
import { SQLite } from "@ionic-native/sqlite";
import { Sql } from "../../providers/sql";
import { Utilities } from "../../providers/utilities";
import { MenuPage } from "../menu/menu";
@Component({
    selector: "page-intro",
    templateUrl: "intro.html"
})
export class IntroPage {
    isReady = false;
    slideData = [{ image: "1.jpg" }, { image: "2.jpg" }, { image: "3.jpg" }];
    constructor(private nav: NavController, sql: SQLite, loading: LoadingController, toast: ToastController, events: Events, alert: AlertController) {
        new Sql(sql);
        new Utilities(loading, toast, events, alert,nav);
        this.isReady = true;
    }
    startApp() { this.nav.setRoot(MenuPage); }
}