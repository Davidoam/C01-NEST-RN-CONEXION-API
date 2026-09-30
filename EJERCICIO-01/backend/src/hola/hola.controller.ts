import { Controller, Get } from '@nestjs/common';

@Controller('hola')
export class HolaController {
  @Get()
  saludar() {
    return {
      mensaje: '¡Hola desde NestJS para DAM!',
      curso: 'DAM',
    };
  }
}
