import { IDatabaseConfig } from './db-config.interface';
import { IJwtConfig } from './jwt-config.interface';

export interface IConfig {
	nodeEnv: string;
	port: string;
	database: IDatabaseConfig;
	jwt: IJwtConfig;
}