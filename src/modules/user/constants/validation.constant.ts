import { IValidation } from "../interfaces";

export const constants: IValidation = {
	username: {
		minLength: 4,
		maxLength: 16
	},
	email: {
		minLength: 4,
		maxLength: 254
	},
	password: {
		minLength: 4,
		maxLength: 50
	},
	firstName: {
		minLength: 1,
		maxLength: 50
	},
	lastName: {
		minLength: 1,
		maxLength: 50
	}
}