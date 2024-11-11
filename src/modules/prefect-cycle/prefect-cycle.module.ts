import { Module } from '@nestjs/common';
import { PrefectCycleService } from './prefect-cycle.service';
import { PrefectCycleController } from './prefect-cycle.controller';
import { ProducerClientModule } from '../producer-client/producer-client.module';

@Module({
  imports: [ProducerClientModule],
  providers: [PrefectCycleService],
  controllers: [PrefectCycleController],
  exports: [PrefectCycleService],
})
export class PrefectCycleModule {}
