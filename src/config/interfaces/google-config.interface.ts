export interface IGoogleConfig {
	auth: IGoogleAuthConfig;
}

export interface IGoogleAuthConfig {
	id: string;
	secret: string;
}