import { Duration, Email, MealPrice, OrderRate, OrderType, Phone, Price, Uri } from "./Types";

export declare namespace Interfaces {
    export interface IPerson {
        firstName: string;
        lastName: string;
        fullName(): string;
        email: Email;
        phones: Phone[];
        address: IAddress;
        addPhone(phone: Phone): void;
    }

    export interface ILogin {
        username: string;
        password: string;
        token: string;
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
        addOffer(offer: IOffer): void;
        addOrder(order: IOrder): void;
        addReservation(reservation: IReservation): void;
    }

    export interface IBranch {
        _id: string;
        name: string;
        manager: IBranchManager;
        address: IAddress;
        login: ILogin;
        phones: Phone[];
        addPhone(phone: Phone): void;
        generateToken(): string;
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

    export interface IUser extends IPerson {
        _id: string;
        login: ILogin;
        image: Uri;
        socialMedia: ISocialMedia[];
        points: number;
        favourites: string[];
        orders: string[];
        favouritesCount(): number;
        ordersCount(): number;
        addSocialMedia(socialMedia: ISocialMedia): void;
        generateToken(): string;
    }

    export interface IRestaurantOwner extends IPerson { }

    export interface IBranchManager extends IPerson { }

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
        rate: OrderRate;
        price(): Price;
        owner: string;
        meals: MealPrice[];
        mealsCount(): number;
        addMeal(meal: IMeal): void;
    }

    export interface IOrder extends ISubOrder {
        type: OrderType;
        address: IAddress;
        subOrders: string[];
        time: Date;
        subOrdersCount(): number;
        mealsCount(): number;
        addsubOrder(subOrder: ISubOrder): void;
    }

    export interface IMeal {
        _id: string;
        name: string;
        image: Uri;
        category: string;
        price: Price;
        ingredients: IIngredient[];
        ingredientsCount(): number;
        addIngredient(ingredient: IIngredient): void;
        addIngredients(ingredient: IIngredient[]): void;
    }
}