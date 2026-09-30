import { Injectable } from '@nestjs/common';

export type Heroe = {
  id: number;
  nombre: string;
  poder: string;
  universo: string;
};

@Injectable()
export class HeroesService {
  private readonly heroes: Heroe[] = [
    { id: 1, nombre: 'Spider-Man', poder: 'Sentido arácnido', universo: 'Marvel' },
    { id: 2, nombre: 'Batman', poder: 'Inteligencia e ingeniería', universo: 'DC' },
    { id: 3, nombre: 'Goku', poder: 'Kamehameha', universo: 'Dragon Ball' },
  ];

  findOne(id: number): Heroe | undefined {
    return this.heroes.find((heroe) => heroe.id === id);
  }
}
