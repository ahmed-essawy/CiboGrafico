import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar, Splashscreen } from "ionic-native";
import { IntroPage } from "../pages/intro/intro";
import {MenuPage} from "../pages/menu/menu";
@Component({
    templateUrl: "app.html"
})
export class MyApp {
    // rootPage = IntroPage;
    rootPage = MenuPage;
    constructor(platform: Platform) {
        platform.ready().then(() => {
            if (!platform.is("cordova")) return;
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }
}