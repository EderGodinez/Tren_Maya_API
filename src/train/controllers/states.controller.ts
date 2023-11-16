import { Controller, Get, Param } from "@nestjs/common";
import { StatesService } from "../services/states.service";

@Controller('states')
export class StatesController {
  constructor(private readonly stateService: StatesService) {}
  ///Obtener todos los estados
  @Get()
  findAll() {
    return this.stateService.findAll();
  }
}