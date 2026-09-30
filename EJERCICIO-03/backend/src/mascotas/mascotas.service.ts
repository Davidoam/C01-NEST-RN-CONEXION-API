import { Injectable, Get, Param } from '@nestjs/common';



@Injectable()
export class MascotasService {
  private readonly mascotas = [
    { id: 1, nombre: 'Luna', tipo: 'perro' },
    { id: 2, nombre: 'Milo', tipo: 'gato' },
  ];


  @Get(':id')
  findOne(@Param('id') id: number) {
  return this.mascotas.find(mascota => mascota.id === id);
  }

  

}
