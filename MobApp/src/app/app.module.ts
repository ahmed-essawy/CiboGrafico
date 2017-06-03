import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { IntroPage } from "../pages/intro/intro";
import { MenuPage } from "../pages/menu/menu";
import { OffersPage } from "../pages/offers/offers";
import { TraditionalMenuPage } from "../pages/traditionalMenu/traditionalMenu";
import { offerDetailsPage } from "../pages/offerDetails/offerDetails";
import { HTTP } from "@ionic-native/http";
@NgModule({
        declarations: [MyApp, HomePage, IntroPage, MenuPage, OffersPage, TraditionalMenuPage, offerDetailsPage],
        imports: [IonicModule.forRoot(MyApp)],
        bootstrap: [IonicApp],
        entryComponents: [MyApp, HomePage, IntroPage, MenuPage, OffersPage, TraditionalMenuPage, offerDetailsPage],
        providers: [HTTP, { provide: ErrorHandler, useClass: IonicErrorHandler }]
    })
export class AppModule {}