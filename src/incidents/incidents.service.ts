import { Injectable } from '@nestjs/common';
import { CreateIncidentDto } from './dto/Incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';

@Injectable()
export class IncidentsService {
  create(createIncidentDto: CreateIncidentDto) {
    return 'This action adds a new incident';
  }

  findAll() {
    return `This action returns all incidents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} incident`;
  }

  update(id: number, updateIncidentDto: UpdateIncidentDto) {
    return `This action updates a #${id} incident`;
  }

  remove(id: number) {
    return `This action removes a #${id} incident`;
  }
}
