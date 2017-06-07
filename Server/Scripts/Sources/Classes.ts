import {
    IUser, IRestaurant, IBranch, IRestaurantOwner, IBranchManager, IMeal, IOrder, ISubOrder, IOffer,
    IReservation, IAuthentication, IAddress, IIngredient, IBranchAddress, IReview
} from "./Interfaces";
import { Duration, Email, MealPrice, Rate, OrderType, Phone, Price, Uri, Id, Username, AccountType, objectId } from
    "./Types";
import {
    Validator, IsNotEmpty, Length, IsInt, IsAlpha, IsUrl, IsArray, IsEmail, IsAlphanumeric, IsEnum, IsDate,
    IsString
} from "class-validator";
const valid = new Validator();
const md5 = require("md5");
export class User implements IUser {
    _id: string;
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;
    fullName(): string { return this.firstName + " " + this.lastName; }
    @IsEmail()
    email: Email;
    @IsString()
    username: Username;
    @IsArray()
    phones: Array<Phone>;
    image: Uri;
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
    constructor(id: string, firstName: string, lastName: string, email: Email, username: Username,
        phones: Array<Phone> = Array<Phone>(), public address: Address = new Address(), image: Uri = "") {
        this._id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.phones = phones;
        this.image = "http://imgur.com/a/WEVjy";
        if (valid.isURL(image)) this.image = image;
        this.points = 0;
        this.favorites = Array<Meal>();
        this.orders = Array<string>();
    }
    addPhone(phone: Phone): void { this.phones.pushIfNotExist(phone) }
    favoritesCount(): number { return this.favorites.length; }
    ordersCount(): number { return this.orders.length; }
    static deserialize(object: User): User {
        const user = new User(object._id, object.firstName, object.lastName, object.email, object.username, object
            .phones, object.address, object.image);
        user.favorites = object.favorites;
        user.orders = object.orders;
        return user;
    }
}
export class Restaurant implements IRestaurant {
    _id: string;
    @IsString()
    name: string;
    @IsUrl()
    logo: Uri;
    @IsArray()
    branches: Array<Branch>;
    @IsArray()
    reviews: Array<Review>;
    @IsArray()
    rates: Array<{ _id: string; rate: Rate }>;
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
        this.reviews = Array<Review>();
        this.rates = Array<{ _id: string; rate: Rate }>();
        if (branch) this.branches.pushIfNotExist(branch);
        this.meals = Array<Meal>();
        this.offers = Array<string>();
        this.orders = Array<string>();
        this.reservations = Array<Reservation>();
    }
    addBranch(branch: Branch): void { this.branches.pushIfNotExist(branch); }
    addReview(review: Review): void { this.reviews.push(review); }
    addRate(rate: { _id: string; rate: Rate }): void { this.rates.push(rate); }
    addMeal(meal: Meal): void { this.meals.pushIfNotExist(meal); }
    addOffer(offer: Id): void { this.offers.pushIfNotExist(offer._id); }
    addOrder(order: Id): void { this.orders.pushIfNotExist(order._id); }
    addReservation(reservation: Reservation): void { this.reservations.push(reservation); }
    branchesCount(): number { return this.branches.length; }
    reviewsCount(): number { return this.reviews.length; }
    ratesCount(): number { return this.rates.length; }
    mealsCount(): number { return this.meals.length; }
    offersCount(): number { return this.offers.length; }
    ordersCount(): number { return this.orders.length; }
    reservationsCount(): number { return this.reservations.length; }
    static deserialize(object: Restaurant): Restaurant {
        const restaurant = new Restaurant(object._id, object.name, object.logo, object.owner);
        restaurant.branches = object.branches;
        restaurant.reviews = object.reviews;
        restaurant.rates = object.rates;
        restaurant.meals = object.meals;
        restaurant.offers = object.offers;
        restaurant.orders = object.orders;
        restaurant.reservations = object.reservations;
        return restaurant;
    }
}
export class Branch implements IBranch {
    _id: string;
    @IsString()
    name: string;
    @IsEmail()
    email: Email;
    @IsString()
    username: Username;
    @IsArray()
    phones: Array<Phone>;
    @IsInt()
    guestsPerTable: number;
    @IsInt()
    maximumGuests: number;
    constructor(id: string, name: string, manager: Manager, address: BranchAddress, email: Email, username: Username,
        phones: Array<Phone>, maximumGuests: number);
    constructor(id: string, name: string, manager: Manager, address: BranchAddress, email: Email, username: Username,
        phones: Array<Phone>, maximumGuests: number, guestsPerTable: number);
    constructor(id: string, name: string, public manager: Manager, public address: BranchAddress, email: Email,
        username: Username, phones: Array<Phone>, maximumGuests: number, guestsPerTable: number = 4) {
        this._id = objectId(id);
        this.name = name;
        this.email = email;
        this.username = username;
        this.phones = phones;
        this.maximumGuests = maximumGuests;
        this.guestsPerTable = guestsPerTable;
    }
    addPhone(phone: Phone): void { this.phones.pushIfNotExist(phone); }
    static deserialize(object: Branch): Branch {
        return new Branch(object._id, object.name, object.manager, object.address, object.email, object.username, object
            .phones, object.maximumGuests, object.guestsPerTable);
    }
}
export class Owner implements IRestaurantOwner {
    @IsString()
    firstName: string;
    @IsString()
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
    static deserialize(object: Owner): Owner {
        return new Owner(object.firstName, object.lastName, object.phones, object.email, object.address);
    }
}
export class Manager implements IBranchManager {
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;
    @IsEmail()
    email: Email;
    fullName(): string { return this.firstName + " " + this.lastName; }
    @IsArray()
    phones: Array<Phone>;
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
    static deserialize(object: Manager): Manager {
        return new Manager(object.firstName, object.lastName, object.phones, object.email, object.address);
    }
}
export class Meal implements IMeal {
    _id: string;
    @IsString()
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
    static deserialize(object: Meal): Meal {
        const meal = new Meal(object._id, object.name, object.image, object.category, object.price);
        meal.ingredients = object.ingredients;
        return meal;
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
        this.num = num;
        this.owner = owner;
        this.meals = meals;
        this.rate = Rate[Rate.None];
        this.time = new Date();
    }
    mealsCount(): number { return this.meals.length; }
    addMeal(meal: MealPrice): void { this.meals.pushIfNotExist(meal) }
    static deserialize(object: SubOrder): SubOrder {
        const subOrder = new SubOrder(object._id, object.num, object.owner);
        subOrder.meals = object.meals;
        return subOrder;
    }
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
    static deserialize(object: Order): Order {
        const type: OrderType = OrderType[object.type];
        const order = new Order(object._id, object.num, object.owner, object.restaurant, type, object.address);
        order.subOrders = object.subOrders;
        return order;
    }
}
export class Offer implements IOffer {
    _id: string;
    provider: string;
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
    constructor(id: string, provider: string, image: Uri, description: string, meal: string, discount: number,
        duration: Duration);
    constructor(id: string, provider: string, image: Uri, description: string, meal: string, discount: number,
        duration: Duration, startDate: Date);
    constructor(id: string, provider: string, image: Uri, description: string, meal: string, discount: number,
        duration: Duration, startDate: Date = new Date()) {
        this._id = id;
        this.provider = provider;
        this.image = image;
        this.description = description;
        this.meal = meal;
        this.discount = discount;
        this.startDate = new Date(startDate);
        this.endDate = new Date(this.startDate.getTime() + duration * 3600000);
    }
}
export class Reservation implements IReservation {
    _id: string;
    owner: string;
    branch: string;
    @IsInt()
    guests: number;
    @IsDate()
    date: Date;
    time: Date;
    constructor(id: string, owner: string, branch: string, guests: number, date: Date, time: Date);
    constructor(id: string, owner: string, branch: string, guests: number, date: Date, time: Date, order: string);
    constructor(id: string, owner: string, branch: string, guests: number, date: Date, time: Date,
        public order?: string) {
        this._id = id;
        this.owner = owner;
        this.branch = branch;
        this.guests = guests;
        this.date = date;
        this.time = time;
    }
}
export class Authentication implements IAuthentication {
    _id: string;
    @IsEnum(AccountType)
    type: AccountType;
    @IsEmail()
    email: Email;
    @IsString()
    username: Username;
    password: string;
    token: string;
    @IsArray()
    devices: Array<string>;
    @IsArray()
    socials: Array<{ "name": string, "data": any }>;
    constructor(id: string, type: AccountType, email: Email, username: Username, password: string) {
        this._id = id;
        this.email = email;
        this.username = username;
        this.devices = Array<string>();
        this.password = md5(password);
        this.token = md5(this.type + this.username + this.password + "ITIGraduationProject" + new Date());
    }
    addDevice(device: string): void { this.devices.pushIfNotExist(device) }
    addSocial(social: { "name": string, "data": any }): void { this.socials.pushIfNotExist(social) }
    static deserialize(object: Authentication): Authentication {
        const auth = new Authentication(object._id, object.type, object.email, object.username, object.password);
        auth.password = object.password;
        auth.devices = object.devices;
        auth.socials = object.socials;
        return auth;
    }
}
export class Address implements IAddress {
    constructor();
    constructor(street: string);
    constructor(street: string, city: string);
    constructor(street: string, city: string, country: string);
    constructor(public street: string = "", public city: string = "Alexandria", public country: string = "Egypt") { }
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
    @IsString()
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
export class Review implements IReview {
    _id: string;
    @IsString()
    comment: string;
    @IsDate()
    date: Date;
    constructor(id: string, comment: string);
    constructor(id: string, comment: string, date: Date);
    constructor(id: string, comment: string, date: Date = new Date()) {
        this._id = id;
        this.comment = comment;
        this.date = date;
    }
}