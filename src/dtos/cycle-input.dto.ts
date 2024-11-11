import { ArrayNotEmpty, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CycleItemDto } from './cycle-item.dto';
import { ProcessModeEnum } from '../enums/process-mode.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CycleInputDto {
  @ApiProperty({ description: 'Processing mode for the cycle (traditional or async) - default is (traditional) ', 
    examples:[ProcessModeEnum.Traditional]
  },)
  @IsEnum(ProcessModeEnum)
  mode: ProcessModeEnum = ProcessModeEnum.Traditional;
  
  @ApiProperty({ type: [CycleItemDto], description: 'Array of cycle items to be processed' })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CycleItemDto)
  data: CycleItemDto[];
}
