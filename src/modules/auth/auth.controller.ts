import { Body, Controller, Post } from "@nestjs/common";
import { LoginUserDto } from "../dtos";
import { CreateUserDto } from "../user/dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('signin')
	async signIn(@Body() loginUserDto: LoginUserDto) {
		return this.authService.signIn(loginUserDto);
	}

	@Post('signup')
	async signUp(@Body() createUserDto: CreateUserDto) {
		return this.authService.signUp(createUserDto);
	}
}