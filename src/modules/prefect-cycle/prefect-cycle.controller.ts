import { Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { PrefectCycleService } from './prefect-cycle.service';
import { CycleInputDto } from '../../dtos/cycle-input.dto';
 import { ApiCycleCheckOperation, ApiCycleCheckBody, ApiCycleCheckResponse } from './swagger-cycle.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cycles') 
@Controller('cycles')
export class PrefectCycleController {

    constructor(private readonly prefectCycleService: PrefectCycleService,
    ) {
    }
  // Check API endpoint
  @Post('check')
  @ApiCycleCheckOperation
  @ApiCycleCheckBody
  @ApiCycleCheckResponse
  async checkPerfectCycles(@Body() data:CycleInputDto) {
    try {
      const results = await this.prefectCycleService.processCycles(data);
      return results;
    } catch (error) {
      console.error('Error processing cycles:', error);
      throw new InternalServerErrorException('Service error');
    }
  }


}
