import { Injectable } from "@angular/core";
import { Api } from "./api";
import { PromiseResp } from "./classes";
@Injectable()
export class Offers {
    constructor(private api: Api) { }
    readAll(): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.api.get("Offers/Read", null).then((data: PromiseResp) => {
                if (Array.isArray(data.response)) resolve(new PromiseResp(true, data.response));
                else reject(new PromiseResp(false, new Array()));
            }).catch(e => reject(e));
        });
    }
}