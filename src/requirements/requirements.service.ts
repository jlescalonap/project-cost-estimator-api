import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RequirementsService {
  constructor(private prisma: PrismaService) {}

  async create(
    projectId: string,
    userId: string,
    createRequirementDto: CreateRequirementDto,
  ) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
        isDeleted: false,
      },
    });

    if (!project) {
      throw new NotFoundException(
        `Project with ID ${projectId} not found or deleted`,
      );
    }

    return this.prisma.requirement.create({
      data: {
        ...createRequirementDto,
        projectId,
      },
    });
  }

  async findAll(projectId: string, userId: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
        isDeleted: false,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    return this.prisma.requirement.findMany({
      where: {
        projectId,
      },
    });
  }

  async findOne(id: string, projectId: string, userId: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
        isDeleted: false,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    const requirement = await this.prisma.requirement.findFirst({
      where: {
        id,
        projectId,
      },
    });

    if (!requirement) {
      throw new NotFoundException(`Requirement with ID ${id} not found`);
    }

    return requirement;
  }

  async update(
    id: string,
    projectId: string,
    userId: string,
    updateRequirementDto: UpdateRequirementDto,
  ) {
    await this.findOne(id, projectId, userId);

    return this.prisma.requirement.update({
      where: { id },
      data: updateRequirementDto,
    });
  }

  async remove(id: string, projectId: string, userId: string) {
    await this.findOne(id, projectId, userId);

    return this.prisma.requirement.delete({
      where: { id },
    });
  }
}
