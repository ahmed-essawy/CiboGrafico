import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { AboutPage } from "../pages/about/about";
import { ContactPage } from "../pages/contact/contact";
import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";
import { IntroPage } from "../pages/intro/intro";
import { MenuPage } from "../pages/menu/menu";
import { LocationPage } from "../pages/location/location";
import { StatusBar } from "@ionic-native/status-bar";
import { HTTP } from "@ionic-native/http";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Geolocation as GeoLocation } from "@ionic-native/geolocation";
import { GoogleMaps } from "@ionic-native/google-maps";
@NgModule({
    declarations: [MyApp, IntroPage, LocationPage, AboutPage, ContactPage, HomePage, TabsPage, MenuPage],
    entryComponents: [MyApp, IntroPage, LocationPage, AboutPage, ContactPage, HomePage, TabsPage, MenuPage],
    imports: [BrowserModule, IonicModule.forRoot(MyApp)],
    bootstrap: [IonicApp],
    providers: [GoogleMaps, StatusBar, SplashScreen, HTTP, GeoLocation, {
        provide: ErrorHandler,
        useClass: IonicErrorHandler
    }]
})
export class AppModule { }