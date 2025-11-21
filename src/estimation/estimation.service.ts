import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  HOURLY_RATES,
  COMPLEXITY_MULTIPLIERS,
  BASE_HOURS_BY_COMPLEXITY,
  SENIORITY_SPEED_FACTOR,
} from './constants/rates.config';
import {
  CalculationResultDto,
  RequirementBreakdown,
} from './dto/calculation-result.dto';

@Injectable()
export class EstimationService {
  constructor(private prisma: PrismaService) {}

  async calculateProjectCost(
    projectId: string,
    userId: string,
    developerSeniority: 'JUNIOR' | 'MID' | 'SENIOR' = 'MID',
  ): Promise<CalculationResultDto> {
    // 1. Verificar que el proyecto existe y pertenece al usuario
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
        isDeleted: false,
      },
      include: {
        requirements: true,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found or access denied');
    }

    // 2. Obtener tarifa horaria según seniority
    const hourlyRate = HOURLY_RATES[developerSeniority];
    const speedFactor = SENIORITY_SPEED_FACTOR[developerSeniority];

    // 3. Calcular horas y costos por requerimiento
    let totalHours = 0;
    const breakdown: RequirementBreakdown[] = [];

    for (const requirement of project.requirements) {
      // 3a. Determinar horas base
      let hours: number;
      if (requirement.estimatedHours) {
        // Si tiene estimación manual, usarla
        hours = requirement.estimatedHours;
      } else {
        // Si no, derivar de la complejidad
        hours = BASE_HOURS_BY_COMPLEXITY[requirement.complexity];
      }

      // 3b. Aplicar multiplicador de complejidad
      const complexityMultiplier =
        COMPLEXITY_MULTIPLIERS[requirement.complexity];
      hours = hours * complexityMultiplier;

      // 3c. Aplicar factor de velocidad por seniority
      hours = hours * speedFactor;

      // 3d. Calcular costo de este requerimiento
      const cost = hours * hourlyRate;

      // 3e. Acumular
      totalHours += hours;

      breakdown.push({
        requirementId: requirement.id,
        title: requirement.title,
        complexity: requirement.complexity,
        hours: Math.round(hours * 100) / 100, // Redondear a 2 decimales
        cost: Math.round(cost * 100) / 100,
      });
    }

    // 4. Calcular costo total
    const totalCost = totalHours * hourlyRate;

    return {
      totalHours: Math.round(totalHours * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      currency: 'USD',
      breakdown,
    };
  }
}
