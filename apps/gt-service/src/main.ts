import { NestFactory } from '@nestjs/core';
import { GtServiceModule } from './gt-service.module';

async function bootstrap() {
  const app = await NestFactory.create(GtServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
