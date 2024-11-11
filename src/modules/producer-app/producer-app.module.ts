import { Module } from '@nestjs/common';
import { ProducerAppController } from './producer-app.controller';
import { ProducerAppService } from './producer-app.service';
import { PrefectCycleModule } from '../prefect-cycle/prefect-cycle.module';

@Module({
  imports: [PrefectCycleModule,],
  controllers: [ProducerAppController],
  providers: [ProducerAppService],
})
export class ProducerAppModule {}
