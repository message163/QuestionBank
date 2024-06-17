import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as port from '@questionbank/config'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port.fsPort);
}
bootstrap();
