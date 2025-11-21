import { IsOptional, IsEnum } from 'class-validator';

export enum DeveloperSeniority {
  JUNIOR = 'JUNIOR',
  MID = 'MID',
  SENIOR = 'SENIOR',
}

export class CalculateCostDto {
  @IsOptional()
  @IsEnum(DeveloperSeniority)
  seniority?: DeveloperSeniority = DeveloperSeniority.MID;
}
