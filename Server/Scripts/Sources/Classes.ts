import {
    IUser, ISocialMedia, IRestaurant, IBranch, IRestaurantOwner, IBranchManager, IMeal, IOrder, ISubOrder, IOffer,
    IReservation, IAuthentication, IAddress, IIngredient, IBranchAddress
    } from "./Interfaces";
import { Duration, Email, MealPrice, Rate, OrderType, Phone, Price, Uri, Id, Username, AccountType, objectId } from
    "./Types";
import { IsNotEmpty, Length, IsInt, IsAlpha, IsUrl, IsArray, IsEmail, IsAlphanumeric, IsEnum, IsDate, IsString }
    from
    "class-validator";
const md5 = require("md5");
export class User implements IUser {
    _id: string;
    @IsAlpha()
    firstName: string;
    @IsAlpha()
    lastName: string;
    fullName(): string { return this.firstName + " " + this.lastName; }
    @IsEmail()
    email: Email;
    @IsAlphanumeric()
    username: Username;
    @IsArray()
    phones: Array<Phone>;
    @IsUrl()
    image: Uri;
    @IsArray()
    socialMedia: Array<SocialMedia>;
    @IsInt()
    points: number;
    @IsArray()
    favorites: Array<Meal>;
    @IsArray()
    orders: Array<string>;
    constructor(id: string, firstName: string, lastName: string, email: Email, username: Username);
    constructor(id: string, firstName: string, lastName: string, email: Email, username: Username,
                phones: Array<Phone>);
    constructor(id: string, firstName: string, lastName: string, email: Email, username: Username, phones: Array<Phone>,
                address: Address);
    constructor(id: string, firstName: string, lastName: string, email: Email, username: Username, phones: Array<Phone>,
                address: Address, image: Uri);
    constructor(id: string, firstName: string, lastName: string, email: Email, username: Username, phones: Array<Phone>,
                address: Address, image: Uri, socialMedia: Array<SocialMedia>);
    constructor(id: string, firstName: string, lastName: string, email: Email, username: Username,
                phones: Array<Phone> = Array<Phone>(), public address: Address = new Address(), image: Uri = "",
                socialMedia: Array<SocialMedia> = Array<SocialMedia>()) {
        this._id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.phones = phones;
        this.image = image;
        this.points = 0;
        this.favorites = Array<Meal>();
        this.orders = Array<string>();
        this.socialMedia = socialMedia;
    }
    addPhone(phone: Phone): void { this.phones.pushIfNotExist(phone) }
    addSocialMedia(socialMedia: SocialMedia): void { this.socialMedia.pushIfNotExist(socialMedia) }
    favoritesCount(): number { return this.favorites.length; }
    ordersCount(): number { return this.orders.length; }
}
export class SocialMedia implements ISocialMedia {
    @IsString()
    provider: string;
    @IsUrl()
    uri: string;
    constructor(provider: string, uri: Uri) {
        this.provider = provider;
        this.uri = uri;
    }
}
export class Restaurant implements IRestaurant {
    _id: string;
    @IsAlpha()
    name: string;
    @IsUrl()
    logo: Uri;
    @IsArray()
    branches: Array<Branch>;
    @IsArray()
    reviews: Array<{ _id: string; Rate: Rate }>;
    @IsArray()
    meals: Array<Meal>;
    @IsArray()
    offers: Array<string>;
    @IsArray()
    orders: Array<string>;
    @IsArray()
    reservations: Array<Reservation>;
    constructor(id: string, name: string, logo: Uri, owner: Owner);
    constructor(id: string, name: string, logo: Uri, owner: Owner, branch: Branch);
    constructor(id: string, name: string, logo: Uri, public owner: Owner, branch?: Branch) {
        this._id = objectId(id);
        this.name = name;
        this.logo = logo;
        this.branches = Array<Branch>();
        this.reviews = Array<{ _id: string; Rate: Rate }>();
        if (branch) this.branches.pushIfNotExist(branch);
        this.meals = Array<Meal>();
        this.offers = Array<string>();
        this.orders = Array<string>();
        this.reservations = Array<Reservation>();
    }
    addBranch(branch: Branch): void { this.branches.pushIfNotExist(branch); }
    addReview(review: { _id: string; Rate: Rate }): void { this.reviews.pushIfNotExist(review); }
    addMeal(meal: Meal): void { this.meals.pushIfNotExist(meal); }
    addOffer(offer: Id): void { this.offers.pushIfNotExist(offer._id); }
    addOrder(order: Id): void { this.orders.pushIfNotExist(order._id); }
    addReservation(reservation: Reservation): void { this.reservations.pushIfNotExist(reservation); }
    branchesCount(): number { return this.branches.length; }
    reviewsCount(): number { return this.reviews.length; }
    mealsCount(): number { return this.meals.length; }
    offersCount(): number { return this.offers.length; }
    ordersCount(): number { return this.orders.length; }
    reservationsCount(): number { return this.reservations.length; }
}
export class Branch implements IBranch {
    _id: string;
    @IsAlpha()
    name: string;
    @IsEmail()
    email: Email;
    @IsAlphanumeric()
    username: Username;
    @IsArray()
    phones: Array<Phone>;
    constructor(id: string, name: string, public manager: Manager, public address: BranchAddress, email: Email,
                username: Username, phones: Array<Phone>) {
        this._id = objectId(id);
        this.name = name;
        this.email = email;
        this.username = username;
        this.phones = phones;
    }
    addPhone(phone: Phone): void { this.phones.pushIfNotExist(phone); }
}
export class Owner implements IRestaurantOwner {
    @IsAlpha()
    firstName: string;
    @IsAlpha()
    lastName: string;
    fullName(): string { return this.firstName + " " + this.lastName; }
    @IsArray()
    phones: Array<Phone>;
    @IsEmail()
    email: Email;
    constructor(firstName: string, lastName: string, phones: Array<Phone>);
    constructor(firstName: string, lastName: string, phones: Array<Phone>, email: Email);
    constructor(firstName: string, lastName: string, phones: Array<Phone>, email: Email, address: Address);
    constructor(firstName: string, lastName: string, phones: Array<Phone>, email: Email = "",
                public address: Address = new Address()) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phones = phones;
        this.email = email;
    }
    addPhone(phone: Phone): void { this.phones.pushIfNotExist(phone); }
}
export class Manager implements IBranchManager {
    @IsAlpha()
    firstName: string;
    @IsAlpha()
    lastName: string;
    @IsEmail()
    email: Email;
    fullName(): string { return this.firstName + " " + this.lastName; }
    @IsArray()
    phones: Array<Phone>;
    constructor(firstName: string, lastName: string, phone: Phone);
    constructor(firstName: string, lastName: string, phone: Phone, email: Email);
    constructor(firstName: string, lastName: string, phone: Phone, email: Email, address: Address);
    constructor(firstName: string, lastName: string, phone: Phone, email: Email = "",
                public address: Address = new Address()) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phones = Array<Phone>();
        this.phones.pushIfNotExist(phone);
    }
    addPhone(phone: Phone): void { this.phones.pushIfNotExist(phone); }
}
export class Meal implements IMeal {
    _id: string;
    @IsAlpha()
    name: string;
    @IsUrl()
    image: Uri;
    @IsInt()
    price: Price;
    @IsArray()
    ingredients: Array<string>;
    ingredientsCount(): number { return this.ingredients.length; }
    constructor(id: string, name: string, image: Uri, public category: string, price: Price) {
        this._id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.ingredients = new Array<string>();
    }
    addIngredient(ingredient: Id): void { this.ingredients.pushIfNotExist(ingredient._id); }
    addIngredients(ingredients: Array<Id>): void {
        ingredients.forEach(item => this.ingredients.pushIfNotExist(item._id));
    }
}
export class SubOrder implements ISubOrder {
    _id: string;
    @IsInt()
    num: number;
    owner: string;
    @IsArray()
    meals: Array<MealPrice>;
    rate: string;
    @IsDate()
    time: Date;
    price(): Price { return this.meals.reduce((a, b) => a + b.price, 0); }
    constructor(id: string, num: number, owner: string);
    constructor(id: string, num: number, owner: string, meals: Array<MealPrice>);
    constructor(id: string, num: number, owner: string, meals: Array<MealPrice> = new Array<MealPrice>()) {
        this._id = id;
        this.owner = owner;
        this.meals = meals;
        this.rate = Rate[Rate.None];
        this.time = new Date();
    }
    mealsCount(): number { return this.meals.length; }
    addMeal(meal: MealPrice): void { this.meals.pushIfNotExist(meal) }
}
export class Order extends SubOrder implements IOrder {
    @IsArray()
    subOrders: Array<string>;
    @IsEnum(OrderType)
    type: string;
    restaurant: string;
    constructor(id: string, num: number, owner: string, restaurant: string, type: OrderType, address: Address);
    constructor(id: string, num: number, owner: string, restaurant: string, type: OrderType, address: Address,
                meals: Array<MealPrice>);
    constructor(id: string, num: number, owner: string, restaurant: string, type: OrderType, public address: Address,
                meals: Array<MealPrice> = new Array<MealPrice>()) {
        super(id, num, owner, meals);
        this.subOrders = Array<string>();
        this.type = OrderType[type];
    }
    addsubOrder(subOrder: Id): void { this.subOrders.pushIfNotExist(subOrder._id) }
    subOrdersCount(): number { return this.subOrders.length; }
}
export class Offer implements IOffer {
    _id: string;
    @IsUrl()
    image: Uri;
    @IsString()
    description: string;
    @IsInt()
    discount: number;
    @IsDate()
    startDate: Date;
    meal: string;
    endDate: Date;
    constructor(id: string, image: Uri, description: string, meal: string, discount: number, duration: Duration);
    constructor(id: string, image: Uri, description: string, meal: string, discount: number, duration: Duration,
                startDate: Date);
    constructor(id: string, image: Uri, description: string, meal: string, discount: number, duration: Duration,
                startDate: Date = new Date()) {
        this._id = id;
        this.image = image;
        this.description = description;
        this.meal = meal;
        this.discount = discount;
        this.startDate = this.endDate = startDate;
        this.endDate.setHours(this.endDate.getHours() + duration);
    }
}
export class Reservation implements IReservation {
    _id: string;
    owner: string;
    @IsInt()
    guests: number;
    @IsInt()
    guestsPerTable: number;
    tablesCount(): number { return this.guests / this.guestsPerTable; }
    constructor(id: string, owner: string, guests: number, guestsPerTable: number);
    constructor(id: string, owner: string, guests: number, guestsPerTable: number, order: string);
    constructor(id: string, owner: string, guests: number, guestsPerTable: number, public order?: string) {
        this._id = id;
        this.owner = owner;
        this.guests = guests;
        this.guestsPerTable = guestsPerTable;
    }
}
export class Authentication implements IAuthentication {
    _id: string;
    @IsEnum(AccountType)
    type: AccountType;
    @IsEmail()
    email: Email;
    @IsAlphanumeric()
    username: Username;
    password: string;
    token: string;
    @IsArray()
    devices: Array<string>;
    constructor(id: string, type: AccountType, email: Email, username: Username, password: string) {
        this._id = id;
        this.email = email;
        this.username = username;
        this.devices = Array<string>();
        this.password = md5(password);
        this.token = md5(this.type + this.username + this.password + "ITIGraduationProject" + new Date());
    }
    addDevice(device: string): void { this.devices.pushIfNotExist(device) }
}
export class Address implements IAddress {
    constructor();
    constructor(street: string);
    constructor(street: string, city: string);
    constructor(street: string, city: string, country: string);
    constructor(public street: string = "", public city: string = "Alexandria", public country: string = "Egypt") {}
}
export class BranchAddress extends Address implements IBranchAddress {
    @IsString()
    area: string;
    constructor(area: string, city: string);
    constructor(area: string, city: string, country: string);
    constructor(area: string, city: string, country: string, street: string);
    constructor(area: string, public city: string, public country: string = "Egypt",
                public street: string = "") {
        super(street, city, country);
        this.area = area;
    }
}
export class Ingredient implements IIngredient {
    _id: string;
    @IsAlpha()
    name: string;
    @IsUrl()
    image: Uri;
    constructor(id: string, name: string);
    constructor(id: string, name: string, image: string);
    constructor(id: string, name: string, image: Uri = "") {
        this._id = id;
        this.name = name;
        this.image = image;
    }
}