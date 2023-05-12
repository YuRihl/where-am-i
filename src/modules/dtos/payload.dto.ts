import { User } from "@prisma/client";

export class PayloadDto {
	sub: number;
	email: string;
	username: string;

	static toDto(user: User): PayloadDto {
		const dto = new PayloadDto();

		dto.sub = user.id;
		dto.email = user.email;
		dto.username = user.username;

		return dto;
	}
}