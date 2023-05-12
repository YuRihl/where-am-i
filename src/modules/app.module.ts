import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configure } from 'src/config/config';
import { validate } from 'src/config/config.validator';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
	imports: [UserModule, ConfigModule.forRoot({
		isGlobal: true,
		load: [configure],
		validate
	})],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
