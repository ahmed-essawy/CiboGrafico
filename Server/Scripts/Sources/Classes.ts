import { Interfaces as I } from "./Interfaces";
import { Duration, Email, MealPrice, OrderRate, OrderType, Phone, Price, Uri } from "./Types";
const md5 = require("md5");

export class User implements I.IUser {
    fullName(): string { return this.firstName + " " + this.lastName; }

    phones: Phone[];
    points: number;
    favourites: string[];
    orders: string[];

    constructor(_id: string, firstName: string, lastName: string, email: Email, login: Login, phone: Phone, address: Address);
    constructor(_id: string, firstName: string, lastName: string, email: Email, login: Login, phone: Phone, address: Address, image: Uri);
    constructor(_id: string, firstName: string, lastName: string, email: Email, login: Login, phone: Phone, address: Address, image: Uri, socialMedia: SocialMedia[]);
    constructor(public _id: string, public firstName: string, public lastName: string, public email: Email, public login: Login, phone: Phone, public address: Address = new Address(), public image: Uri = "", public socialMedia: SocialMedia[] = Array<SocialMedia>()) {
        this.phones = Array<Phone>();
        this.phones.push(phone);
        this.points = 0;
        this.favourites = Array<string>();
        this.orders = Array<string>();
    }

    addPhone(phone: Phone): void { this.phones.push(phone) }

    addSocialMedia(socialMedia: SocialMedia): void { this.socialMedia.push(socialMedia) }

    favouritesCount(): number { return this.favourites.length; }

    ordersCount(): number { return this.orders.length; }

    generateToken(): string {
        this.login.token = md5(this.login.username + this.login.password + "ITIGraduationProject" + new Date());
        return this.login.token;
    }
}

export class SocialMedia implements I.ISocialMedia {
    constructor(public provider: string, public uri: Uri) { }
}

export class Restaurant implements I.IRestaurant {
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

    addOffer(offer: Offer): void { this.offers.push(offer._id); }

    addOrder(order: Order): void { this.orders.push(order._id); }

    addReservation(reservation: Reservation): void { this.reservations.push(reservation); }

    branchesCount(): number { return this.branches.length; }

    mealsCount(): number { return this.meals.length; }

    offersCount(): number { return this.offers.length; }

    ordersCount(): number { return this.orders.length; }

    reservationsCount(): number { return this.reservations.length; }
}

export class Branch implements I.IBranch {
    phones: Phone[];

    get token(): string { return "123" };

    constructor(public _id: string, public name: string, public manager: Manager, public address: Address, public login: Login, phone: Phone) {
        this.phones = Array<Phone>();
        this.phones.push(phone);
    }

    addPhone(phone: Phone): void { this.phones.push(phone); }

    generateToken(): string {
        this.login.token = md5(this.login.username + this.login.password + "ITIGraduationProject" + new Date());
        return this.login.token;
    }
}

export class Owner implements I.IRestaurantOwner {
    fullName(): string { return this.firstName + " " + this.lastName; }

    phones: Phone[];

    constructor(firstName: string, lastName: string, phone: Phone);
    constructor(firstName: string, lastName: string, phone: Phone, email: Email);
    constructor(firstName: string, lastName: string, phone: Phone, email: Email, address: Address);
    constructor(public firstName: string, public lastName: string, public phone: Phone, public email: Email = "", public address: Address = new Address()) {
        this.phones = Array<Phone>();
        this.phones.push(phone);
    }

    addPhone(phone: Phone): void { this.phones.push(phone); }
}

export class Manager implements I.IBranchManager {
    fullName(): string { return this.firstName + " " + this.lastName; }

    phones: Phone[];

    constructor(firstName: string, lastName: string, phone: Phone);
    constructor(firstName: string, lastName: string, phone: Phone, email: Email);
    constructor(firstName: string, lastName: string, phone: Phone, email: Email, address: Address);
    constructor(public firstName: string, public lastName: string, public phone: Phone, public email: Email = "", public address: Address = new Address()) {
        this.phones = Array<Phone>();
        this.phones.push(phone);
    }

    addPhone(phone: Phone): void { this.phones.push(phone); }
}

export class Meal implements I.IMeal {
    ingredients: Ingredient[];

    ingredientsCount(): number { return this.ingredients.length; }

    constructor(public _id: string, public name: string, public image: Uri, public category: string, public price: Price) { this.ingredients = new Array<Ingredient>(); }

    addIngredient(ingredient: Ingredient): void { this.ingredients.push(ingredient); }

    addIngredients(ingredients: Ingredient[]): void { ingredients.forEach(item => this.ingredients.push(item)); }
}

export class SubOrder implements I.ISubOrder {
    owner: string;
    rate: OrderRate;
    time: Date;

    price(): Price { return this.meals.reduce((a, b) => a + b.price, 0); }

    constructor(_id: string, num: number, owner: User);
    constructor(_id: string, num: number, owner: User, meals: MealPrice[]);
    constructor(public _id: string, public num: number, owner: User, public meals: MealPrice[] = new Array<MealPrice>()) {
        this.owner = owner._id;
        this.rate = OrderRate.None;
        this.time = new Date();
    }

    mealsCount(): number { return this.meals.length; }

    addMeal(meal: Meal): void { this.meals.push(meal) }
}

export class Order extends SubOrder {
    subOrders: string[];

    constructor(_id: string, num: number, owner: User, type: OrderType, address: Address);
    constructor(_id: string, num: number, owner: User, type: OrderType, address: Address, meals: MealPrice[]);
    constructor(_id: string, num: number, owner: User, public type: OrderType, public address: Address, meals: MealPrice[] = new Array<MealPrice>()) {
        super(_id, num, owner, meals);
        this.subOrders = Array<string>();
    }

    subOrdersCount(): number { return this.subOrders.length; }
}

//var meal1 = new Meal("42423", "fsufhsdj", "das", "asdas", 20);
//var meal2 = new Meal("42423", "fsufhsdj", "Das", "asdas", 30);
//var y = new Order("12312", 3432, x, OrderDelivery, new Address("dasa"), [meal1, meal2]);
//console.log(y.price);

export class Offer implements I.IOffer {
    meal: string;

    constructor(_id: string, image: Uri, description: string, meals: Meal, discount: number, duration: Duration);
    constructor(_id: string, image: Uri, description: string, meals: Meal, discount: number, duration: Duration, startDate: Date);
    constructor(public _id: string, public image: Uri, public description: string, meal: Meal, public discount: number, public duration: Duration, public startDate: Date = new Date()) {
        this.meal = meal._id;
    }
}

export class Reservation implements I.IReservation {
    owner: string;

    tablesCount(): number { return this.guests / this.guestsPerTable; }

    constructor(_id: string, owner: User, guests: number, guestsPerTable: number);
    constructor(_id: string, owner: User, guests: number, guestsPerTable: number, order: string);
    constructor(public _id: string, owner: User, public guests: number, public guestsPerTable: number, public order?: string) {
        this.owner = owner._id;
    }
}

export class Login implements I.ILogin {
    token: string;

    constructor(public username: string, public password: string) { this.token = md5(this.username + this.password + "ITIGraduationProject" + new Date()); }
}

export class Address implements I.IAddress {
    constructor();
    constructor(street: string);
    constructor(street: string, city: string);
    constructor(street: string, city: string, country: string);
    constructor(public street: string = "", public city: string = "Alexandria", public country: string = "Egypt") { }
}

export class Ingredient implements I.IIngredient {
    constructor(public _id: string, public name: string, public image: string) { }
}