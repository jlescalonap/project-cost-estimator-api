export class CalculationResultDto {
  totalHours: number;
  totalCost: number;
  currency: string;
  breakdown?: RequirementBreakdown[];
}

export class RequirementBreakdown {
  requirementId: string;
  title: string;
  complexity: string;
  hours: number;
  cost: number;
}
