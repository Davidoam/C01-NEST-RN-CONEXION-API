import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { HeroesService } from './heroes.service.js';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    const heroe = this.heroesService.findOne(Number(id));

    if (!heroe) {
      throw new NotFoundException(`No se encontró un héroe con el ID ${id}.`);
    }

    return heroe;
  }
}
