import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as port from '@questionbank/config/index'
import { InterceptorInterceptor } from './interceptor/interceptor.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true, // 允许cookie跨域
  });
  app.useGlobalInterceptors(new InterceptorInterceptor());
  await app.listen(port.serverPort);
}
bootstrap();
