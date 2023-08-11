import { IDatabaseConfig, IGoogleConfig, IJwtConfig } from '.';

export interface IConfig {
	nodeEnv: string;
	port: string;
	database: IDatabaseConfig;
	jwt: IJwtConfig;
	google: IGoogleConfig;
}