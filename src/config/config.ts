import { IConfig } from './interfaces';

export const configure = (): IConfig => ({
	nodeEnv: process.env.NODE_ENV,
	port: process.env.PORT,
	database: {
		name: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		dialect: process.env.DB_DIALECT,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		url: process.env.DB_URL,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		expiresIn: process.env.JWT_EXPIRES_IN,
	},
	google: {
		auth: {
			id: process.env.GOOGLE_CLIENT_ID,
			secret: process.env.GOOGLE_CLIENT_SECRET
		}
	}
})