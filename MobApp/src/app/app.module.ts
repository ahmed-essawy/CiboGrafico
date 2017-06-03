import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { Network } from "@ionic-native/network";
import { HTTP } from "@ionic-native/http";
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { AccountPage } from "../pages/account/account";
import { LoginTabs } from "../pages/loginTabs/loginTabs";
import { IntroPage } from "../pages/intro/intro";
import { MenuPage } from "../pages/menu/menu";
import { Facebook } from "@ionic-native/facebook";
import { LoginPage } from "../pages/loginTabs/login/login";
import { SignupPage } from "../pages/loginTabs/signup/signup";
import { Api } from "../providers/api";
import { Sql } from "../providers/sql";
import { SQLite } from "@ionic-native/sqlite";
import { Users } from "../providers/users";
import { RestaurantsListPage } from "../pages/RestaurantsList/RestaurantsList";
import { RestaurantProfilePage } from "../pages/RestaurantProfile/RestaurantProfile";
import { reservationPage } from "../pages/reservation/reservation"
import { Ionic2RatingModule } from "ionic2-rating";
import { OffersPage } from "../pages/offers/offers";
import { TraditionalMenuPage } from "../pages/traditionalMenu/traditionalMenu";
import { offerDetailsPage } from "../pages/offerDetails/offerDetails";
@NgModule({
        declarations: [MyApp, HomePage, AccountPage, LoginTabs, IntroPage, MenuPage, LoginPage, SignupPage,
            RestaurantsListPage, RestaurantProfilePage, reservationPage, OffersPage, TraditionalMenuPage,
            offerDetailsPage],
        imports: [IonicModule.forRoot(MyApp), Ionic2RatingModule],
        bootstrap: [IonicApp],
        entryComponents: [MyApp, HomePage, AccountPage, LoginTabs, IntroPage, MenuPage, LoginPage, SignupPage,
            RestaurantsListPage, RestaurantProfilePage, reservationPage, OffersPage, TraditionalMenuPage,
            offerDetailsPage],
        providers: [Network, Api, Sql, SQLite, Facebook, Users, HTTP, { provide: ErrorHandler,
            useClass: IonicErrorHandler }]
    })
export class AppModule {}