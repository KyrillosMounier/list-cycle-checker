import { Module } from '@nestjs/common';
import { CounsumerAppController } from './consumer-app.controller';
import { PrefectCycleModule } from '../prefect-cycle/prefect-cycle.module';

@Module({
  imports: [PrefectCycleModule,],
  controllers: [CounsumerAppController],
})
export class ConsumerAppModule {}
