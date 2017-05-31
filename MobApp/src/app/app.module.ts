import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { IntroPage } from "../pages/intro/intro";
import { MenuPage } from "../pages/menu/menu";
import { Facebook } from "@ionic-native/facebook";
import {LoginPage} from "../pages/login/login";
import { Api } from "../providers/api";
@NgModule({
    declarations: [MyApp, HomePage, IntroPage, MenuPage, LoginPage],
    imports: [IonicModule.forRoot(MyApp)],
    bootstrap: [IonicApp],
    entryComponents: [MyApp, HomePage, IntroPage, MenuPage, LoginPage],
    providers: [Facebook, Api, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule {}