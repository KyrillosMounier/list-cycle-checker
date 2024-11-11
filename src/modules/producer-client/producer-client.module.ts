import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { NOTIFICATIONS_QUEUE_OPTIONS } from '../../config/queues';
import { ProducerRmqClientService } from './producer-rmq-client.service';

@Module({
    imports:[
        ClientsModule.register([
            NOTIFICATIONS_QUEUE_OPTIONS,
          ]),
    ],
    providers: [ProducerRmqClientService],
    exports:[ProducerRmqClientService]
})
export class ProducerClientModule {}
