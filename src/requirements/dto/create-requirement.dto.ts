import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  Min,
} from 'class-validator';
import { Complexity, Priority } from '@prisma/client';

export class CreateRequirementDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Complexity)
  @IsNotEmpty()
  complexity: Complexity;

  @IsNumber()
  @IsOptional()
  @Min(0)
  estimatedHours?: number;

  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;
}
