import { Injectable } from "@angular/core";
import { LoadingController, Loading, ToastController, Events } from "ionic-angular";
@Injectable()
export class Utilities {
    static loader: Loading;
    static loadingCtrl: LoadingController;
    static toast;
    static toastCtrl: ToastController;
    static eventsCtrl: Events;
    constructor(loadingCtrl: LoadingController, toastCtrl: ToastController, eventsCtrl: Events) {
        Utilities.loadingCtrl = loadingCtrl;
        Utilities.toastCtrl = toastCtrl;
        Utilities.eventsCtrl = eventsCtrl;
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
}