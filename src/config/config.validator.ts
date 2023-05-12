import { Type, plainToInstance } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';
import { NodeEnvironment } from './enums';

export class EnvironmentVariables {
	@IsEnum(NodeEnvironment)
	NODE_ENV: NodeEnvironment;

	@IsNumber()
	@Type(() => Number)
	PORT: number;

	@IsString()
	@IsNotEmpty()
	DB_URL: string;

	@IsString()
	@IsNotEmpty()
	DB_HOST: string;

	@IsNumber()
	@Type(() => Number)
	DB_PORT: number;

	@IsString()
	@IsNotEmpty()
	DB_NAME: string;

	@IsString()
	@IsNotEmpty()
	DB_PASSSWORD: string;

	@IsString()
	@IsNotEmpty()
	DB_DIALECT: string;

	@IsString()
	@IsNotEmpty()
	JWT_SECRET: string;

	@IsString()
	@IsNotEmpty()
	JWT_EXPIRES_IN: string;
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(
		EnvironmentVariables,
		config,
		{ enableImplicitConversion: true },
	);
	const errors = validateSync(validatedConfig, { skipMissingProperties: false });

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}

	return validatedConfig;
}