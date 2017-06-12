import { Injectable } from "@angular/core";
import { Api } from "./api";
import { PromiseResp } from "./classes";
@Injectable()
export class Orders {
    constructor(private api: Api) { }
    joinOrder(params: { num: number, owner: string, meals: Array<any> }): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.api.post("Orders/CreateSubOrder", params).then((resp: PromiseResp) => {
                const data: any = resp.response;
                if (data.insertSubOrder.n > 0 && data.addToUser.nModified > 0 && data.addToOrder.nModified > 0) resolve(new PromiseResp(true, "Insertion Succeeded"));
                else reject(new PromiseResp(false, "Number doesn't exist"));
            }).catch(e => reject(new PromiseResp(e.success, "Connection Error")));
        });
    }
    createOrder(params: { owner: string, restaurant: string, type: string, address: { street: string, city: string, country: string }, meals: Array<any> }): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.api.post("Orders", params).then((resp: PromiseResp) => {
                const data: any = resp.response;
                if (data.number && data.insertOrder.n > 0 && data.addToUser.nModified > 0 && data.addToRestaurant.nModified > 0) resolve(new PromiseResp(true, { OrderNum: data.number }));
                else reject(new PromiseResp(false, "Order has not been inserted"));
            }).catch(e => reject(new PromiseResp(e.success, "Connection Error")));
        });
    }
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
            this.api.get("Orders/userMeal", params).then((data: PromiseResp) => {
                if (data.response) resolve(new PromiseResp(true, data.response));
                else reject(new PromiseResp(false, new Array()));
            }).catch(e => reject(e));
        });
    }
}