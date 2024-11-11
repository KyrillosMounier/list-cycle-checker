import { Injectable } from '@nestjs/common';

@Injectable()
export class ProducerAppService {
  getHealthCheck(): string {
    return 'Application is running smoothly!';
  }
}
