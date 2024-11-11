import { IsString, IsArray, IsNumber, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CycleItemDto {
  @ApiProperty({
    description: 'The name of the cycle list.',
    example: 'cycleList1',
  })
  @IsString()
  listName: string;

  @ApiProperty({
    description: 'Array of numbers representing the cycle data.',
    type: [Number],
    example: [0, 1, 2, 3],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  arr: number[];
}
