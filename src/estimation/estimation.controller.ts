import { Controller, Post, Param, Body, UseGuards, Req } from '@nestjs/common';
import { EstimationService } from './estimation.service';
import { CalculateCostDto } from './dto/calculate-cost.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects/:projectId/calculate-cost')
@UseGuards(AuthGuard('jwt'))
export class EstimationController {
  constructor(private readonly estimationService: EstimationService) {}

  @Post()
  calculate(
    @Req() req,
    @Param('projectId') projectId: string,
    @Body() calculateCostDto: CalculateCostDto,
  ) {
    return this.estimationService.calculateProjectCost(
      projectId,
      req.user.id,
      calculateCostDto.seniority,
    );
  }
}
