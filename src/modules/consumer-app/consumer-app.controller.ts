import { Controller } from '@nestjs/common';
import { CycleItemDto } from '../../dtos/cycle-item.dto';
import { MessagePattern } from '@nestjs/microservices';
import { PrefectCycleService } from '../prefect-cycle/prefect-cycle.service';
import { MessagePatternEnum } from '../../enums/message-pattern.enum';

@Controller()
export class CounsumerAppController {
  constructor( private readonly prefectCycleService : PrefectCycleService) {}

    // Message Handler in (Consumer Side)
    @MessagePattern(MessagePatternEnum.ProcessCycle)
    checkForPrefectCycle(data:CycleItemDto []) {
      const result = this.prefectCycleService.isPerfectCycle(data);
      return result;
    }
}
