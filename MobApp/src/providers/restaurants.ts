import { Injectable } from "@angular/core";
import { Api } from "./api";
import { PromiseResp } from "./classes";
export * from "./classes";
@Injectable()
export class Restaurants {
    constructor(private api: Api) {}
    readAll(): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.api.get("Restaurants", null).then((resp: PromiseResp) => {
                let data: any = resp.response;
                if (Array.isArray(data)) resolve(new PromiseResp(true, data));
                else reject(new PromiseResp(false, new Array()));
            }).catch(e => reject(e));
        });
    }
    read(params: any): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.api.get("Restaurants", params).then((resp: PromiseResp) => {
                let data: any = resp.response;
                if (data._id) resolve(new PromiseResp(true, data));
                else reject(new PromiseResp(false, new Array()));
            }).catch(e => reject(e));                                                           
        });
    }
    readBranches(params: any): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.api.get("Restaurant/Branches/ByRestauarnt", params).then((resp: PromiseResp) => {
                let data: any = resp.response;
                if (Array.isArray(data)) resolve(new PromiseResp(true, data));
                else reject(new PromiseResp(false, new Array()));
            }).catch(e => reject(e));
        });
    }

    addReservation(body): Promise<PromiseResp> {
        console.log("out body")
        console.log(body)
        return new Promise((resolve, reject) => {
            console.log("in body")
            console.log(body)
            this.api.put("Restaurants/Reservation", body).then((resp: PromiseResp) => {
                console.log("in promise")
                let data: any = resp.response;
                console.log(data)
                if (data["nModified"] > 0) resolve(new PromiseResp(true, "Reservation added"));
                else reject(new PromiseResp(false, "Can't reserve"));
            }).catch(e => reject(new PromiseResp(e.success, "Can't reserve")));
        });
    }

    addReview(body): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.api.put("Restaurants/Review", body).then((resp: PromiseResp) => {
                let data: any = resp.response;
                if (data["nModified"] > 0) resolve(new PromiseResp(true, "Review added"));
                else reject(new PromiseResp(false, "Can't add review"));
            }).catch(e => reject(new PromiseResp(e.success, "Can't add review")));
        });
    }
}
    
