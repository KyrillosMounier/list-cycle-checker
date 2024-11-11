import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { NOTIFICATIONS_QUEUE_OPTIONS } from './config/queues';
import { ConsumerAppModule } from './modules/consumer-app/consumer-app.module';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ConsumerAppModule, NOTIFICATIONS_QUEUE_OPTIONS);

  await app.listen();
  console.log('Microservice is listening'); // Place the log outside of `listen()`

}

bootstrap();
