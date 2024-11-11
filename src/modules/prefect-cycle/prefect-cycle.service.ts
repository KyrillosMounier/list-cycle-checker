import { Injectable } from '@nestjs/common';
import { CycleItemDto } from '../../dtos/cycle-item.dto';
import { CycleOutputDto } from '../../dtos/cycle-output.dto';
import { ProducerRmqClientService } from '../producer-client/producer-rmq-client.service';
import { CycleInputDto } from '../../dtos/cycle-input.dto';
import { MessagePatternEnum } from '../../enums/message-pattern.enum';
import { ProcessModeEnum } from '../../enums/process-mode.enum';
import config from '../../config/config';

@Injectable()
export class PrefectCycleService {
  constructor(
    private readonly producerRmqClientService: ProducerRmqClientService,
  ) {}

  /**
   * General handler to process cycles, either synchronously or asynchronously
   * based on mode specified in the CycleInputDto.
   */
  processCycles(cycleInput: CycleInputDto): CycleOutputDto | string {
    // If mode is Async or data length exceeds threshold, process asynchronously
    if (
      cycleInput.mode === ProcessModeEnum.Async ||
      cycleInput.data.length > config.jsonLenghtThreshold
    ) {
      return this.processAsynchronously(cycleInput.data);
    } else {
      return this.processSynchronously(cycleInput.data);
    }
  }

  /**
   * Process cycles synchronously.
   */
  private processSynchronously(data: CycleItemDto[]): CycleOutputDto {
    return this.isPerfectCycle(data); // Return the result from the synchronous check
  }

  /**
   * Process cycles asynchronously using RabbitMQ.
   */
  private processAsynchronously(data: CycleItemDto[]): string {
    // Log the start of the asynchronous process
    console.log('Initiating asynchronous cycle processing. Sending data to RabbitMQ...');
  
    // Send the cycle list message to the RabbitMQ queue
    this.producerRmqClientService
      .sendCycleListMessage(MessagePatternEnum.ProcessCycle, data)
      .subscribe({
        next: (response) => {
          // Log the response received after the queue has processed the message
          console.log('RabbitMQ responded after processing the cycle data:');
          console.log(response);
  
          // Here, we can use socket programming (like WebSockets,Socket.io or Server-Sent Events) 
          // to notify the user of the result once the queue processing is complete.
          
  
          // You can return the results back to the client once processing is completed.
          // This could involve updating the status in the UI or sending the result back via an API.
  
          console.log('Processing completed successfully. Result sent to the client (can use socket to notify user).');
        },
        error: (err) => {
          // Log the error if the RabbitMQ message processing fails
          console.error('Error occurred while processing the cycle data via RabbitMQ:');
          console.error(err);
  
          console.error('Possible reasons could include RabbitMQ being down, network issues, or malformed messages.');
          console.error('Unable to process the cycle data. Please try again later.');
        },
        complete: () => {
          // Log completion (whether successful or not) of the observable execution
          console.log('RabbitMQ processing attempt completed.');
        },
      });
  
    // Return a confirmation message indicating that the message has been sent to the queue
    return 'List has been sent to the queue for perfect cycle verification. Processing is underway.';
  }
  

  /**
   * Check if the cycles are perfect.
   */
  public isPerfectCycle(data: CycleItemDto[]): CycleOutputDto {
    const results: CycleOutputDto = {};

    for (const { listName, arr } of data) {
      const visited = new Array(arr.length).fill(false);
      let index = 0;
      let steps = 0;

      while (steps < arr.length) {
        if (visited[index]) {
          results[listName] = false;
          break;
        }
        visited[index] = true;
        index = arr[index];
        steps++;
      }

      // Check if all elements were visited exactly once and we returned to index 0
      results[listName] = steps === arr.length && index === 0;
    }

    console.log('results', results);
    return results; // Return the final results object
  }
}
