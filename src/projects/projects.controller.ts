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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport'; // Usaremos el Guard de JWT

@Controller('projects')
@UseGuards(AuthGuard('jwt')) // <--- ¡TODA la ruta protegida!
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Req() req, @Body() createProjectDto: CreateProjectDto) {
    // req.user viene del JwtStrategy
    return this.projectsService.create(req.user.id, createProjectDto);
  }

  @Get()
  findAll(@Req() req) {
    return this.projectsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.projectsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, req.user.id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.projectsService.remove(id, req.user.id);
  }
}
