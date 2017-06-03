import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { Network } from '@ionic-native/network';
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
@NgModule({
    declarations: [MyApp, HomePage, AccountPage, LoginTabs, IntroPage, MenuPage, LoginPage, SignupPage],
    imports: [IonicModule.forRoot(MyApp)],
    bootstrap: [IonicApp],
    entryComponents: [MyApp, HomePage, AccountPage, LoginTabs, IntroPage, MenuPage, LoginPage, SignupPage],
    providers: [Network, Api, Sql, SQLite, Facebook, Users, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }