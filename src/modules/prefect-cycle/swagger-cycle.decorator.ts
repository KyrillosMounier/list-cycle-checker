// swagger-cycle.decorator.ts
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import * as dataExamples from '../../../data-example.json';
import { CycleInputDto } from '../../dtos/cycle-input.dto';

export const ApiCycleCheckOperation = ApiOperation({ summary: 'Check if cycles are perfect' });

export const ApiCycleCheckBody = ApiBody({
  description: 'List of cycle data to process',
  type: CycleInputDto,
  examples: {
    example1: {
      summary: 'Synchronous processing example',
      value: {
        mode: 'async',
        data: dataExamples,
      },
    },
    example2: {
      summary: 'Asynchronous processing example (using Messaging system RMQ)',
      value: {
        mode: 'async',
        data: dataExamples,
      },
    },
  },
});

export const ApiCycleCheckResponse = ApiResponse({
  schema: {
    oneOf: [
      {
        type: 'string',
        description: 'A success or error message',
        example: 'List submitted for processing',
      },
      {

        type: 'CycleOutputDto',
        description: 'Cycle output result',
        example: { 'List A': true, 'List B': false },
      },
    ],
  },
});
