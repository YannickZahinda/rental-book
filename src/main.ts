import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  ConfigModule.forRoot({
    isGlobal: true,
  })

  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  // await app.listen(process.env.PORT ?? 3000);
  await app.listen(port);

}
bootstrap();
