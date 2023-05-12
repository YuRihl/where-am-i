import { IStringValidation } from "src/interfaces";

export interface IValidation {
	username: IStringValidation;
	email: IStringValidation;
	password: IStringValidation;
	firstName: IStringValidation;
	lastName: IStringValidation;
}