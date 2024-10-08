import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { Incident, Reporter, Location } from './dto/incident.dto';
import { IIncidensRepostiory } from './incidets.interface'


@Controller('incidents')
export class IncidentsController {

  public constructor(private readonly incidentsService: IncidentsService) {}



  @Post()
  create(@Body() createIncident: Incident) {
    return this.incidentsService.CreateIncident(createIncident);
  }

  @Get()
  findAll() {
    return this.incidentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incidentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncidentDto: Incident) {
    return this.incidentsService.update(+id, updateIncidentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incidentsService.remove(+id);
  }
}
