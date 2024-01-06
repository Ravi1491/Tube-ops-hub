
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface SignUpInput {
    name: string;
    email: string;
    password: string;
    username: string;
}

export interface User {
    name: string;
    email: string;
    username: string;
}

export interface IQuery {
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    signUp(signUpInput: SignUpInput): User | Promise<User>;
    login(email: string, password: string): User | Promise<User>;
}

type Nullable<T> = T | null;
