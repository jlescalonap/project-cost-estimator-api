import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RequirementsService } from './requirements.service';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects/:projectId/requirements')
@UseGuards(AuthGuard('jwt'))
export class RequirementsController {
  constructor(private readonly requirementsService: RequirementsService) {}

  @Post()
  create(
    @Req() req,
    @Param('projectId') projectId: string,
    @Body() createRequirementDto: CreateRequirementDto,
  ) {
    return this.requirementsService.create(
      projectId,
      req.user.id,
      createRequirementDto,
    );
  }

  @Get()
  findAll(@Req() req, @Param('projectId') projectId: string) {
    return this.requirementsService.findAll(projectId, req.user.id);
  }

  @Get(':id')
  findOne(
    @Req() req,
    @Param('projectId') projectId: string,
    @Param('id') id: string,
  ) {
    return this.requirementsService.findOne(id, projectId, req.user.id);
  }

  @Patch(':id')
  update(
    @Req() req,
    @Param('projectId') projectId: string,
    @Param('id') id: string,
    @Body() updateRequirementDto: UpdateRequirementDto,
  ) {
    return this.requirementsService.update(
      id,
      projectId,
      req.user.id,
      updateRequirementDto,
    );
  }

  @Delete(':id')
  remove(
    @Req() req,
    @Param('projectId') projectId: string,
    @Param('id') id: string,
  ) {
    return this.requirementsService.remove(id, projectId, req.user.id);
  }
}
