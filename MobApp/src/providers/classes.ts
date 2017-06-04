export class PromiseResp {
    constructor(success: boolean);
    constructor(success: boolean, response: any);
    constructor(public success: boolean, public response?: string) { }
}