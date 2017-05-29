import { Duration, Email, MealPrice, Phone, Price, Uri, Username, Id, AccountType, Rate } from "./Types";
interface IId {
    _id: string;
}
interface IName {
    name: string;
}
interface IImage {
    image: Uri;
}
export interface IPerson {
    firstName: string;
    lastName: string;
    fullName(): string;
    phones: Array<Phone>;
    addPhone(phone: Phone): void;
}
export interface ILogin {
    email: Email;
    username: Username;
}
export interface IAuthentication extends ILogin, IId {
    type: AccountType;
    password: string;
    token: string;
    devices: Array<string>;
    addDevice(device: string): void;
}
export interface IAddress {
    street: string;
    city: string;
    country: string;
}
export interface IBranchAddress extends IAddress {
    area: string;
}
export interface IIngredient extends IId, IName {
    image: string;
}
export interface IRestaurant extends IId, IName {
    logo: Uri;
    owner: IRestaurantOwner;
    branches: Array<IBranch>;
    reviews: Array<{ _id: string, Rate: Rate }>;
    meals: Array<IMeal>;
    offers: Array<string>;
    orders: Array<string>;
    reservations: Array<IReservation>;
    branchesCount(): number;
    reviewsCount(): number;
    mealsCount(): number;
    offersCount(): number;
    ordersCount(): number;
    reservationsCount(): number;
    addBranch(branch: IBranch): void;
    addReview(review: { _id: string, Rate: Rate }): void;
    addMeal(meal: IMeal): void;
    addOffer(offer: Id): void;
    addOrder(order: Id): void;
    addReservation(reservation: IReservation): void;
}
export interface IBranch extends ILogin, IId, IName {
    manager: IBranchManager;
    address: IBranchAddress;
    phones: Array<Phone>;
    addPhone(phone: Phone): void;
}
export interface IOffer extends IId, IImage {
    description: string;
    discount: number;
    startDate: Date;
    endDate: Date;
    meal: string;
}
export interface IUser extends IPerson, ILogin, IId, IImage {
    socialMedia: Array<ISocialMedia>;
    points: number;
    favorites: Array<IMeal>;
    orders: Array<string>;
    favoritesCount(): number;
    ordersCount(): number;
    addSocialMedia(socialMedia: ISocialMedia): void;
}
export interface IRestaurantOwner extends IPerson { }
export interface IBranchManager extends IPerson { }
export interface ISocialMedia {
    provider: string;
    uri: Uri;
}
export interface IReservation extends IId {
    owner: string;
    guests: number;
    guestsPerTable: number;
    order?: string;
    tablesCount(): number;
}
export interface ISubOrder extends IId {
    num: number;
    rate: string;
    price(): Price;
    owner: string;
    meals: Array<MealPrice>;
    mealsCount(): number;
    addMeal(meal: MealPrice): void;
}
export interface IOrder extends ISubOrder {
    type: string;
    address: IAddress;
    subOrders: Array<string>;
    time: Date;
    subOrdersCount(): number;
    mealsCount(): number;
    addsubOrder(subOrder: Id): void;
    restaurant: string;
}
export interface IMeal extends IId, IName, IImage {
    category: string;
    price: Price;
    ingredients: Array<string>;
    ingredientsCount(): number;
    addIngredient(ingredient: Id): void;
    addIngredients(ingredient: Array<Id>): void;
}