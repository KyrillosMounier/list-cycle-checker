import { Test, TestingModule } from '@nestjs/testing';
import { PrefectCycleController } from './prefect-cycle.controller';
import { PrefectCycleService } from './prefect-cycle.service';
import { CycleInputDto } from '../../dtos/cycle-input.dto';
import { HttpStatus } from '@nestjs/common';
import { ProcessModeEnum } from '../../enums/process-mode.enum';

describe('PrefectCycleController', () => {
  let controller: PrefectCycleController;
  let service: PrefectCycleService;

  // Mock data to pass into the controller
  const mockCycleData: CycleInputDto = {
    data: [
      { listName: 'List A', arr: [1, 2, 3] },
      { listName: 'List B', arr: [4, 5, 6] },
    ],
    mode: ProcessModeEnum.Traditional
  };

  // Mock results that will be returned by the service
  const mockResults = {
    'List A': true,
    'List B': false,
  };

  // Mock of the PrefectCycleService
  const mockPrefectCycleService = {
    processCycles: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrefectCycleController],
      providers: [
        {
          provide: PrefectCycleService,
          useValue: mockPrefectCycleService,
        },
      ],
    }).compile();

    controller = module.get<PrefectCycleController>(PrefectCycleController);
    service = module.get<PrefectCycleService>(PrefectCycleService);
  });

  describe('checkPerfectCycles', () => {
    it('should return the processed results from the service', async () => {
      // Mock the service to return mockResults
      mockPrefectCycleService.processCycles.mockResolvedValue(mockResults);

      // Call the controller method
      const result = await controller.checkPerfectCycles(mockCycleData);

      // Expect the result to be the same as the mockResults
      expect(result).toEqual(mockResults);
    });

    it('should call PrefectCycleService.processCycles with the correct data', async () => {
      // Call the controller method
      await controller.checkPerfectCycles(mockCycleData);

      // Ensure that PrefectCycleService.processCycles was called with the correct input data
      expect(mockPrefectCycleService.processCycles).toHaveBeenCalledWith(mockCycleData);
    });

    it('should handle errors gracefully if the service throws an error', async () => {
      // Mock the service to throw an error
      mockPrefectCycleService.processCycles.mockRejectedValue(new Error('Service error'));

      try {
        await controller.checkPerfectCycles(mockCycleData);
      } catch (e) {
        // Expect the controller to handle the error and return an HTTP error
        expect(e.response.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(e.response.message).toBe('Service error');
      }
    });

    it('should return a valid response if the service returns no results', async () => {
      // Mock the service to return an empty result
      mockPrefectCycleService.processCycles.mockResolvedValue({});

      // Call the controller method
      const result = await controller.checkPerfectCycles(mockCycleData);

      // Expect an empty object as the result
      expect(result).toEqual({});
    });

    it('should validate the incoming request data and ensure it is in the correct format', async () => {
      // Create an invalid CycleInputDto (missing required data or in incorrect format)
      const invalidData = {
        data: [
          { listName: 'List C' }, // Missing 'items'
        ],
      };

      try {
        // Call the controller method with invalid data
        await controller.checkPerfectCycles(invalidData as CycleInputDto);
      } catch (e) {
        // Expect validation errors to be thrown
        expect(e.response.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(e.response.message).toContain('data.items should be an array');
      }
    });
  });
});
