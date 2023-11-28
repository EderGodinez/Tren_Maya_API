import { Controller, Get, Param } from "@nestjs/common";
import { StatesService } from "../services/states.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags('States')
@Controller('states')
export class StatesController {
  constructor(private readonly stateService: StatesService) {}
  ///Obtener todos los estados
  @ApiOperation({ summary: 'Consultar todos los estados de Mexico con su abreviaturas', description: 'Acceso a todo publico' })
  @Get()
  findAll() {
    return this.stateService.findAll();
  }
}