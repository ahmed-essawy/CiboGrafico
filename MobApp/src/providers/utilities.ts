import { Injectable } from "@angular/core";
import { LoadingController, Loading, ToastController } from "ionic-angular";
@Injectable()
export class Utilities {
    static loader: Loading;
    static loadingCtrl: LoadingController;
    static toast;
    static toastController: ToastController;
    constructor(loadingCtrl: LoadingController, toastController: ToastController) {
        Utilities.loadingCtrl = loadingCtrl;
        Utilities.toastController = toastController;
    }
    static showLoader(content = "Please wait...") {
        Utilities.loader = Utilities.loadingCtrl.create({ content: content });
        Utilities.loader.present();
    }
    static hideLoader() { Utilities.loader.dismiss(); }
    static showToast(message: string = "Done successfully.", onDismiss = () => { }) {
        Utilities.toast = Utilities.toastController.create({
            message: message,
            showCloseButton: true,
            closeButtonText: "OK",
            duration: 10000,
            dismissOnPageChange: true
        })
        Utilities.toast.present();
        Utilities.toast.onDidDismiss(onDismiss);
    }
}