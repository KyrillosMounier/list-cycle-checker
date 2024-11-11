import { Module } from '@nestjs/common';
import { CounsumerAppController } from './consumer-app.controller';
import { ConsumerAppService } from './consumer-app.service';
import { PrefectCycleModule } from '../prefect-cycle/prefect-cycle.module';

@Module({
  imports: [PrefectCycleModule,],
  controllers: [CounsumerAppController],
  providers: [ConsumerAppService],
})
export class ConsumerAppModule {}
