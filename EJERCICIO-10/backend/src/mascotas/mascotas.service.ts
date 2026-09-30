import { Injectable } from '@nestjs/common';

export type Mascota = {
  id: number;
  nombre: string;
  tipo: string;
  likes: number;
};

@Injectable()
export class MascotasService {
  private readonly mascotas: Mascota[] = [
    { id: 1, nombre: 'Rocky', tipo: 'perro', likes: 0 },
    { id: 2, nombre: 'Luna', tipo: 'gata', likes: 0 },
  ];

  findOne(id: number): Mascota | undefined {
    return this.mascotas.find((mascota) => mascota.id === id);
  }

  darLike(id: number): Mascota | undefined {
    const mascota = this.findOne(id);
    if (mascota) {
      mascota.likes += 1;
    }
    return mascota;
  }
}
