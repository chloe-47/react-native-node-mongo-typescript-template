/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register_user {
  __typename: "User";
  emailAddress: string;
}

export interface Register_register {
  __typename: "CurrentUser";
  user: Register_register_user | null;
}

export interface Register {
  register: Register_register | null;
}

export interface RegisterVariables {
  emailAddress: string;
  password: string;
}
