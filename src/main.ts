import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


// async function bootstrap() {
//   console.log('ENV CHECK:', process.env.ADMIN_USERNAME);
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();