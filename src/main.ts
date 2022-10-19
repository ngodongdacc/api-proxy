import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

const logger = new Logger('Main');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('api-gateway')
    .setDescription('SEC platform')
    .setVersion('1.0.0')
    .addBearerAuth({ type: 'http', scheme: 'Bearer', bearerFormat: 'JWT' }, 'token')
    .addApiKey({ type: 'apiKey', name: 'api_access_token' }, 'auth0_api_token')
    .addApiKey({ type: 'apiKey', name: 'axonize_api_access_token' }, 'axonize_api_token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/explorer', app, document);
  await app.listen(process.env.APP_PORT);
}
bootstrap().then(() => logger.log(`Service listening 👍: ${process.env.APP_PORT}`));
