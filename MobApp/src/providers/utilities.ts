import { Injectable } from "@angular/core";
import { LoadingController, Loading, ToastController, Events, AlertController, NavController  } from "ionic-angular";
import { LoginTabs } from "../pages/loginTabs/loginTabs";
@Injectable()
export class Utilities {
    static loader: Loading;
    static loadingCtrl: LoadingController;
    static toast;
    static toastCtrl: ToastController;
    static eventsCtrl: Events;
    static alertCtrl: AlertController;
    static navCtrl: NavController;
    constructor(loadingCtrl: LoadingController, toastCtrl: ToastController, eventsCtrl: Events, alertCtrl: AlertController, navCtrl: NavController) {
        Utilities.loadingCtrl = loadingCtrl;
        Utilities.toastCtrl = toastCtrl;
        Utilities.eventsCtrl = eventsCtrl;
        Utilities.alertCtrl = alertCtrl;
        Utilities.navCtrl = navCtrl;
    }
    static showLoader(content = "Please wait...") {
        Utilities.loader = Utilities.loadingCtrl.create({ content: content });
        Utilities.loader.present();
    }
    static hideLoader() { Utilities.loader.dismiss(); }
    static showToast(message: string = "Done successfully.", onDismiss = () => { }) {
        Utilities.toast = Utilities.toastCtrl.create({
            message: message,
            showCloseButton: true,
            closeButtonText: "OK",
            duration: 5000,
            dismissOnPageChange: true
        })
        Utilities.toast.present();
        Utilities.toast.onDidDismiss(onDismiss);
    }
    static loginAlert() {
        let alert = Utilities.alertCtrl.create({
            title: 'Sorry!',
            subTitle: 'You must login first',
            buttons: [
                {
                    text: 'OK',
                    handler: () =>  Utilities.navCtrl.push(LoginTabs)
                },
                {
                    text: 'Cancel',
                    handler: () => alert.dismiss()
                }
            ]
        });
        alert.present();
    }
}