import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ProducerAppModule } from './modules/producer-app/producer-app.module';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(ProducerAppModule);
  
   // Setup Swagger
   const config = new DocumentBuilder()
   .setTitle('Cycle Processing API')
   .setDescription('API to process cycles for perfect cycle check')
   .setVersion('1.0')
   .addTag('cycles')
   .build();

 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api-docs', app, document);
  
  const port =process.env.PORT ?? 3000

  console.log('run on port', port)
  await app.listen(port);
}
bootstrap();
