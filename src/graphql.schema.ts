
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateOrganizationInput {
    name: string;
    description?: Nullable<string>;
}

export interface UpdateOrganizationInput {
    name: string;
    description?: Nullable<string>;
}

export interface SignUpInput {
    name: string;
    email: string;
    password: string;
    username: string;
}

export interface Organization {
    id: string;
    name: string;
    description?: Nullable<string>;
    slug: string;
    createdBy: string;
    onBoarding: boolean;
}

export interface IQuery {
    getMyOrganizations(): Nullable<Organization>[] | Promise<Nullable<Organization>[]>;
    getOrganizationById(id: string): Organization | Promise<Organization>;
    getOrganizationBySlug(slug: string): Organization | Promise<Organization>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createOrganization(createOrganizationInput: CreateOrganizationInput): Organization | Promise<Organization>;
    updateOrganization(id: string, updateOrganizationInput: UpdateOrganizationInput): Organization | Promise<Organization>;
    removeOrganization(id: string): string | Promise<string>;
    signUp(signUpInput: SignUpInput): User | Promise<User>;
    login(email: string, password: string): User | Promise<User>;
}

export interface User {
    name: string;
    email: string;
    username: string;
}

type Nullable<T> = T | null;
