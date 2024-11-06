import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export default class PaginatedInDto{
  @ApiProperty({required: false})
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiProperty({required: false})
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  pageSize: number = 10;

  @ApiProperty({ example: 'id', required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  orderBy: string = 'id';

  @ApiProperty({ enum: OrderDirection, example: OrderDirection.ASC, required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(OrderDirection)
  orderDirection: OrderDirection = OrderDirection.ASC;
}