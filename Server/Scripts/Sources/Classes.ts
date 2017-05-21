import {IUser, ISocialMedia, IRestaurant, IBranch, IRestaurantOwner, IBranchManager, IMeal, ISubOrder, IOffer, IReservation, IAuthentication, IAddress, IIngredient } from "./Interfaces";
import { Duration, Email, MealPrice, OrderRate, OrderType, Phone, Price, Uri, Id, Username, AccountType } from "./Types";
const md5 = require("md5");

export class User implements IUser {
    fullName(): string { return this.firstName + " " + this.lastName; }

    points: number;
    favourites: string[];
    orders: string[];

    constructor(_id: string, firstName: string, lastName: string, email: Email, username: Username);
    constructor(_id: string, firstName: string, lastName: string, email: Email, username: Username, phones: Phone[]);
    constructor(_id: string, firstName: string, lastName: string, email: Email, username: Username, phones: Phone[], address: Address);
    constructor(_id: string, firstName: string, lastName: string, email: Email, username: Username, phones: Phone[], address: Address, image: Uri);
    constructor(_id: string, firstName: string, lastName: string, email: Email, username: Username, phones: Phone[], address: Address, image: Uri, socialMedia: SocialMedia[]);
    constructor(public _id: string, public firstName: string, public lastName: string, public email: Email, public username: Username, public phones: Phone[] = Array<string>(), public address: Address = new Address(), public image: Uri = "", public socialMedia: SocialMedia[] = Array<SocialMedia>()) {
        this.points = 0;
        this.favourites = Array<string>();
        this.orders = Array<string>();
    }

    addPhone(phone: Phone): void { this.phones.push(phone) }

    addSocialMedia(socialMedia: SocialMedia): void { this.socialMedia.push(socialMedia) }

    favouritesCount(): number { return this.favourites.length; }

    ordersCount(): number { return this.orders.length; }
}

export class SocialMedia implements ISocialMedia {
    constructor(public provider: string, public uri: Uri) {}
}

export class Restaurant implements IRestaurant {
    branches: Branch[];
    meals: Meal[];
    offers: string[];
    orders: string[];
    reservations: Reservation[];

    constructor(_id: string, name: string, logo: Uri, owner: Owner);
    constructor(_id: string, name: string, logo: Uri, owner: Owner, branch: Branch);
    constructor(public _id: string, public name: string, public logo: Uri, public owner: Owner, branch?: Branch) {
        this.branches = Array<Branch>();
        if (branch) this.branches.push(branch);
        this.meals = Array<Meal>();
        this.offers = Array<string>();
        this.orders = Array<string>();
        this.reservations = Array<Reservation>();
    }

    addBranch(branch: Branch): void { this.branches.push(branch); }

    addMeal(meal: Meal): void { this.meals.push(meal); }

    addOffer(offer: Id): void { this.offers.push(offer._id); }

    addOrder(order: Id): void { this.orders.push(order._id); }

    addReservation(reservation: Reservation): void { this.reservations.push(reservation); }

    branchesCount(): number { return this.branches.length; }

    mealsCount(): number { return this.meals.length; }

    offersCount(): number { return this.offers.length; }

    ordersCount(): number { return this.orders.length; }

    reservationsCount(): number { return this.reservations.length; }
}

export class Branch implements IBranch {
    constructor(public _id: string, public name: string, public manager: Manager, public address: Address, public email: Email, public username: Username, public phones: Phone[]) {}

    addPhone(phone: Phone): void { this.phones.push(phone); }
}

export class Owner implements IRestaurantOwner {
    fullName(): string { return this.firstName + " " + this.lastName; }

    constructor(firstName: string, lastName: string, phones: Phone[]);
    constructor(firstName: string, lastName: string, phones: Phone[], email: Email);
    constructor(firstName: string, lastName: string, phones: Phone[], email: Email, address: Address);
    constructor(public firstName: string, public lastName: string, public phones: Phone[], public email: Email = "", public address: Address = new Address()) {}

    addPhone(phone: Phone): void { this.phones.push(phone); }
}

export class Manager implements IBranchManager {
    fullName(): string { return this.firstName + " " + this.lastName; }

    phones: Phone[];

    constructor(firstName: string, lastName: string, phone: Phone);
    constructor(firstName: string, lastName: string, phone: Phone, email: Email);
    constructor(firstName: string, lastName: string, phone: Phone, email: Email, address: Address);
    constructor(public firstName: string, public lastName: string, phone: Phone, public email: Email = "", public address: Address = new Address()) {
        this.phones = Array<Phone>();
        this.phones.push(phone);
    }

    addPhone(phone: Phone): void { this.phones.push(phone); }
}

export class Meal implements IMeal {
    ingredients: string[];

    ingredientsCount(): number { return this.ingredients.length; }

    constructor(public _id: string, public name: string, public image: Uri, public category: string, public price: Price) { this.ingredients = new Array<string>(); }

    addIngredient(ingredient: Id): void { this.ingredients.push(ingredient._id); }

    addIngredients(ingredients: Id[]): void { ingredients.forEach(item => this.ingredients.push(item._id)); }
}

export class SubOrder implements ISubOrder {
    owner: string;
    rate: string;
    time: Date;

    price(): Price { return this.meals.reduce((a, b) => a + b.price, 0); }

    constructor(_id: string, num: number, owner: Id);
    constructor(_id: string, num: number, owner: Id, meals: MealPrice[]);
    constructor(public _id: string, public num: number, owner: Id, public meals: MealPrice[] = new Array<MealPrice>()) {
        this.owner = owner._id;
        this.rate = OrderRate[OrderRate.None];
        this.time = new Date();
    }

    mealsCount(): number { return this.meals.length; }

    addMeal(meal: MealPrice): void { this.meals.push(meal) }
}

export class Order extends SubOrder {
    subOrders: string[];
    type: string;

    constructor(_id: string, num: number, owner: Id, restaurant: string, type: OrderType, address: Address);
    constructor(_id: string, num: number, owner: Id, restaurant: string, type: OrderType, address: Address, meals: MealPrice[]);
    constructor(_id: string, num: number, owner: Id, public restaurant: string, type: OrderType, public address: Address, meals: MealPrice[] = new Array<MealPrice>()) {
        super(_id, num, owner, meals);
        this.subOrders = Array<string>();
        this.type = OrderType[type];
    }

    subOrdersCount(): number { return this.subOrders.length; }
}

export class Offer implements IOffer {
    meal: string;

    constructor(_id: string, image: Uri, description: string, meal: Id, discount: number, duration: Duration);
    constructor(_id: string, image: Uri, description: string, meal: Id, discount: number, duration: Duration, startDate: Date);
    constructor(public _id: string, public image: Uri, public description: string, meal: Id, public discount: number, public duration: Duration, public startDate: Date = new Date()) {
        this.meal = meal._id;
    }
}

export class Reservation implements IReservation {
    owner: string;

    tablesCount(): number { return this.guests / this.guestsPerTable; }

    constructor(_id: string, owner: Id, guests: number, guestsPerTable: number);
    constructor(_id: string, owner: Id, guests: number, guestsPerTable: number, order: string);
    constructor(public _id: string, owner: Id, public guests: number, public guestsPerTable: number, public order?: string) {
        this.owner = owner._id;
    }
}

export class Authentication implements IAuthentication {
    password: string;
    token: string;
    devices: string[];

    constructor(public _id: string, public type: AccountType, public email: Email, public username: Username, password: string) {
        this.devices = Array<string>();
        this.password = md5(password);
        this.token = md5(this.type + this.username + this.password + "ITIGraduationProject" + new Date());
    }

    addDevice(device: string): void { this.devices.push(device) }
}

export class Address implements IAddress {
    constructor();
    constructor(street: string);
    constructor(street: string, city: string);
    constructor(street: string, city: string, country: string);
    constructor(public street: string = "", public city: string = "Alexandria", public country: string = "Egypt") {}
}

export class Ingredient implements IIngredient {
    constructor(_id: string, name: string);
    constructor(_id: string, name: string, image: string);
    constructor(public _id: string, public name: string, public image: string = "") {}
}