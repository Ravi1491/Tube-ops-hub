
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateOrganizationInput {
    exampleField?: Nullable<number>;
}

export interface UpdateOrganizationInput {
    id: number;
}

export interface SignUpInput {
    name: string;
    email: string;
    password: string;
    username: string;
}

export interface Organization {
    exampleField?: Nullable<number>;
}

export interface IQuery {
    organizations(): Nullable<Organization>[] | Promise<Nullable<Organization>[]>;
    organization(id: number): Nullable<Organization> | Promise<Nullable<Organization>>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createOrganization(createOrganizationInput: CreateOrganizationInput): Organization | Promise<Organization>;
    updateOrganization(updateOrganizationInput: UpdateOrganizationInput): Organization | Promise<Organization>;
    removeOrganization(id: number): Nullable<Organization> | Promise<Nullable<Organization>>;
    signUp(signUpInput: SignUpInput): User | Promise<User>;
    login(email: string, password: string): User | Promise<User>;
}

export interface User {
    name: string;
    email: string;
    username: string;
}

type Nullable<T> = T | null;
