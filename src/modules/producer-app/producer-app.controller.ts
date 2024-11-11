import { Controller, Get } from '@nestjs/common';
import { ProducerAppService } from './producer-app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class ProducerAppController {
  constructor(private readonly producerAppService: ProducerAppService) {}
  @ApiOperation({
    summary: 'Health Check',
    description: 'Returns the health status of the  producer app.',
    
  })
  @Get()
  healthCheck(): string {
    return this.producerAppService.getHealthCheck();
  }

}
