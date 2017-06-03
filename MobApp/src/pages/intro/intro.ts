import { Component } from "@angular/core";
import { NavController, NavParams, App } from "ionic-angular";
import { HomePage } from "../home/home";
import { MenuPage } from "../menu/menu";
import { SQLite } from "@ionic-native/sqlite";
import { Sql } from "../../providers/sql";
@Component({
    selector: "page-intro",
    templateUrl: "intro.html"
})
export class IntroPage {
    isReady = false;
    slideData = [{ image: "1.jpg" }, { image: "2.jpg" }, { image: "3.jpg" }];
    constructor(private app: App, sql: SQLite) { new Sql(sql); this.isReady = true; }
    startApp() { this.app.getRootNav().setRoot(MenuPage); }
}