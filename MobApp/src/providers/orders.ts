﻿import { Injectable } from "@angular/core";
import { Api } from "./api";
import { PromiseResp } from "./classes";
export * from "./classes";
@Injectable()
export class Orders {
    constructor(private api: Api) { }
    joinOrder(params: { num: number, owner: string, meals: Array<any> }): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.api.post("Orders/CreateSubOrder", params).then((resp: PromiseResp) => {
                const data: any = resp.response;
                if (data.insertSubOrder.n > 0 && data.addToUser.nModified > 0 && data.addToOrder.nModified >
                    0) resolve(new PromiseResp(true, "Insertion Succeeded"));
                else reject(new PromiseResp(false, "Number doesn't exist"));
            }).catch(e => reject(new PromiseResp(e.success, "Connection Error")));
        });
    }
}