import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar, Splashscreen } from "ionic-native";
import { IntroPage } from "../pages/intro/intro";
import { MenuPage } from "../pages/menu/menu";
@Component({
    templateUrl: "app.html"
})
export class MyApp {
    rootPage;
    constructor(platform: Platform) {
        platform.ready().then(() => {
            if (!platform.is("cordova")) return;
            this.rootPage = IntroPage;
            // this.rootPage = MenuPage;
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }
}