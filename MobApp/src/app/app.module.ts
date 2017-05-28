import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { IntroPage } from "../pages/intro/intro";
import { MenuPage } from "../pages/menu/menu";
@NgModule({
    declarations: [MyApp, HomePage, IntroPage, MenuPage],
    imports: [IonicModule.forRoot(MyApp)],
    bootstrap: [IonicApp],
    entryComponents: [MyApp, HomePage, IntroPage, MenuPage],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }