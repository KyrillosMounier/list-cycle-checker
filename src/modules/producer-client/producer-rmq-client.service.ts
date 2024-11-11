import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATIONS_QUEUE } from '../../config/queues';
import { CycleItemDto } from '../../dtos/cycle-item.dto';


@Injectable()
export class ProducerRmqClientService {
  constructor(
    @Inject(NOTIFICATIONS_QUEUE) public notificationQueue: ClientProxy,
  ) {

  }
  sendCycleListMessage(pattern:string,data:CycleItemDto[])
 {
   return this.notificationQueue.send(pattern, data);
 }
 
 pingConsumer() {
  return this.notificationQueue.send('ping_queue', 'ping');
}
}