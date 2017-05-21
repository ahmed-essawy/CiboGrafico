import { Duration, Email, MealPrice, Phone, Price, Uri, Username, Id, AccountType } from "./Types";

export interface IPerson {
    firstName: string;
    lastName: string;
    fullName(): string;
    phones: Phone[];
    addPhone(phone: Phone): void;
}

export interface ILogin {
    email: Email;
    username: Username;
}

export interface IAuthentication extends ILogin {
    _id: string;
    type: AccountType;
    password: string;
    token: string;
    devices: string[];
    addDevice(device: string): void;
}

export interface IAddress {
    street: string;
    city: string;
    country: string;
}

export interface IIngredient {
    _id: string;
    name: string;
    image: string;
}

export interface IRestaurant {
    _id: string;
    name: string;
    logo: Uri;
    owner: IRestaurantOwner;
    branches: IBranch[];
    meals: IMeal[];
    offers: string[];
    orders: string[];
    reservations: IReservation[];
    branchesCount(): number;
    mealsCount(): number;
    offersCount(): number;
    ordersCount(): number;
    reservationsCount(): number;
    addBranch(branch: IBranch): void;
    addMeal(meal: IMeal): void;
    addOffer(offer: Id): void;
    addOrder(order: Id): void;
    addReservation(reservation: IReservation): void;
}

export interface IBranch extends ILogin {
    _id: string;
    name: string;
    manager: IBranchManager;
    address: IAddress;
    phones: Phone[];
    addPhone(phone: Phone): void;
}

export interface IOffer {
    _id: string;
    image: Uri;
    description: string;
    discount: number;
    startDate: Date;
    duration: Duration;
    meal: string;
}

export interface IUser extends IPerson, ILogin {
    _id: string;
    image: Uri;
    socialMedia: ISocialMedia[];
    points: number;
    favourites: string[];
    orders: string[];
    favouritesCount(): number;
    ordersCount(): number;
    addSocialMedia(socialMedia: ISocialMedia): void;
}

export interface IRestaurantOwner extends IPerson {}

export interface IBranchManager extends IPerson {}

export interface ISocialMedia {
    provider: string;
    uri: Uri;
}

export interface IReservation {
    _id: string;
    owner: string;
    guests: number;
    guestsPerTable: number;
    order?: string;
    tablesCount(): number;
}

export interface ISubOrder {
    _id: string;
    num: number;
    rate: string;
    price(): Price;
    owner: string;
    meals: MealPrice[];
    mealsCount(): number;
    addMeal(meal: MealPrice): void;
}

export interface IOrder extends ISubOrder {
    type: string;
    address: IAddress;
    subOrders: string[];
    time: Date;
    subOrdersCount(): number;
    mealsCount(): number;
    addsubOrder(subOrder: Id): void;
    restaurant: Id;
}

export interface IMeal {
    _id: string;
    name: string;
    image: Uri;
    category: string;
    price: Price;
    ingredients: string[];
    ingredientsCount(): number;
    addIngredient(ingredient: Id): void;
    addIngredients(ingredient: Id[]): void;
}