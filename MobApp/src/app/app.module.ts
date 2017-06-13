import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { Network } from "@ionic-native/network";
import { GoogleMaps } from "@ionic-native/google-maps";
import { MyApp } from "./app.component";
import { IonRating } from '../components/ion-rating/ion-rating';
import { HomePage } from "../pages/home/home";
import { AccountPage } from "../pages/account/account";
import { LoginTabs } from "../pages/loginTabs/loginTabs";
import { IntroPage } from "../pages/intro/intro";
import { MenuPage } from "../pages/menu/menu";
import { Facebook } from "@ionic-native/facebook";
import { LoginPage } from "../pages/loginTabs/login/login";
import { SignupPage } from "../pages/loginTabs/signup/signup";
import { SQLite } from "@ionic-native/sqlite";
import { Api } from "../providers/api";
import { Sql } from "../providers/sql";
import { Users } from "../providers/users";
import { Restaurants } from "../providers/restaurants";
import { Offers } from "../providers/offers";
import { Meals } from "../providers/meals";
import { Orders } from "../providers/orders";
import { RestaurantsListPage } from "../pages/RestaurantsList/RestaurantsList";
import { RestaurantProfilePage } from "../pages/RestaurantProfile/RestaurantProfile";
import { reservationPage } from "../pages/reservation/reservation"
import { OffersPage } from "../pages/offers/offers";
import { TraditionalMenuPage } from "../pages/traditionalMenu/traditionalMenu";
import { mealDetailsPage } from "../pages/mealDetails/mealDetails";
import { orderPage } from "../pages/order/order";
import { joinOrderPage } from "../pages/joinOrder/joinOrder";
import { offerDetailsPage } from "../pages/offerDetails/offerDetails";
import { FavoritesPage } from "../pages/account/favorites/favorites";
import { OrdersPage } from "../pages/account/orders/orders";
import { orderDetailsPage } from "../pages/orderDetails/orderDetails";

@NgModule({
    declarations: [IonRating, MyApp, HomePage, AccountPage, LoginTabs, IntroPage, MenuPage, LoginPage, SignupPage,
        RestaurantsListPage, RestaurantProfilePage, reservationPage, OffersPage, TraditionalMenuPage,
        offerDetailsPage, orderPage, joinOrderPage, mealDetailsPage, FavoritesPage, OrdersPage, orderDetailsPage],
    imports: [IonicModule.forRoot(MyApp)],
    bootstrap: [IonicApp],
    entryComponents: [IonRating, MyApp, HomePage, AccountPage, LoginTabs, IntroPage, MenuPage, LoginPage, SignupPage,
        RestaurantsListPage, RestaurantProfilePage, reservationPage, OffersPage, TraditionalMenuPage,
        offerDetailsPage, orderPage, joinOrderPage, mealDetailsPage, FavoritesPage, OrdersPage, orderDetailsPage],
    providers: [GoogleMaps, Network, Api, Sql, SQLite, Facebook, Users, Restaurants, Offers, Meals, Orders, {
        provide: ErrorHandler,
        useClass: IonicErrorHandler
    }]
})
export class AppModule { }