import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { HTTP } from "@ionic-native/http";
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { IntroPage } from "../pages/intro/intro";
import { MenuPage } from "../pages/menu/menu";
import { RestaurantsListPage } from "../pages/RestaurantsList/RestaurantsList";
import { RestaurantProfilePage } from "../pages/RestaurantProfile/RestaurantProfile";
import {reservationPage} from "../pages/reservation/reservation"
import { Ionic2RatingModule } from 'ionic2-rating';
@NgModule({
    declarations: [MyApp, HomePage, IntroPage, MenuPage, RestaurantsListPage, RestaurantProfilePage, reservationPage],
    imports: [IonicModule.forRoot(MyApp), Ionic2RatingModule],
    bootstrap: [IonicApp],
    entryComponents: [MyApp, HomePage, IntroPage, MenuPage, RestaurantsListPage, RestaurantProfilePage, reservationPage],
    providers: [HTTP, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }