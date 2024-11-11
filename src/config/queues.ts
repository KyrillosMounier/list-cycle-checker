import { ClientProviderOptions, Transport } from "@nestjs/microservices";
import config from "./config";

export const NOTIFICATIONS_QUEUE = 'Notifications_Queue';
export const NOTIFICATIONS_QUEUE_OPTIONS = {
  name: NOTIFICATIONS_QUEUE,
  transport: Transport.RMQ,
  options: {
    urls: [config.rmqUrl],
    queue: config.queueName,
    queueOptions: { durable: true },
    noAck: true
  }
} as ClientProviderOptions;