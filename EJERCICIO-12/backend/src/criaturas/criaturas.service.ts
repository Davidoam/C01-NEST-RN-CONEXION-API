import { Injectable } from '@nestjs/common';

export type Criatura = {
  id: number;
  nombre: string;
  tipo: string;
  emoji: string;
  likes: number;
};

@Injectable()
export class CriaturasService {
  private readonly criaturas: Criatura[] = [
    { id: 1, nombre: 'Flamitas', tipo: 'fuego', emoji: '🔥', likes: 0 },
    { id: 2, nombre: 'Burbú', tipo: 'agua', emoji: '💧', likes: 0 },
    { id: 3, nombre: 'Rayín', tipo: 'eléctrico', emoji: '⚡', likes: 0 },
  ];

  findAll(): Criatura[] {
    return this.criaturas;
  }

  findOne(id: number): Criatura | undefined {
    return this.criaturas.find((criatura) => criatura.id === id);
  }

  darLike(id: number): Criatura | undefined {
    const criatura = this.findOne(id);
    if (criatura) {
      criatura.likes += 1;
    }
    return criatura;
  }
}
