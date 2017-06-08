import { Injectable } from "@angular/core";
import { Api } from "./api";
import { PromiseResp } from "./classes";
@Injectable()
export class Orders {
    constructor(private api: Api) { }
    readUserOrders(params: any): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.api.get("Orders/UserOrder", params).then((data: PromiseResp) => {
                if (Array.isArray(data.response)) resolve(new PromiseResp(true, data.response));
                else reject(new PromiseResp(false, new Array()));
            }).catch(e => reject(e));
        });
    }
    readUserOrderDetails(params: any): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.api.get("Meals/userMeals", params).then((data: PromiseResp) => {
                if (Array.isArray(data.response)) resolve(new PromiseResp(true, data.response));
                else reject(new PromiseResp(false, new Array()));
            }).catch(e => reject(e));
        });
    }
}