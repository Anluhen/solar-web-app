import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? true,
    credentials: true,
  });

  const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
  await app.listen(PORT);
  console.log(`API listening on http://localhost:${PORT}`);
}
bootstrap();
