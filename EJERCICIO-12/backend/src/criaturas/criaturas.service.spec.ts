import { CriaturasService } from './criaturas.service.js';

describe('CriaturasService', () => {
  it('lists the three creatures with zero likes', () => {
    const service = new CriaturasService();

    expect(service.findAll()).toEqual([
      { id: 1, nombre: 'Flamitas', tipo: 'fuego', emoji: '🔥', likes: 0 },
      { id: 2, nombre: 'Burbú', tipo: 'agua', emoji: '💧', likes: 0 },
      { id: 3, nombre: 'Rayín', tipo: 'eléctrico', emoji: '⚡', likes: 0 },
    ]);
  });

  it('finds a creature by ID', () => {
    const service = new CriaturasService();

    expect(service.findOne(2)?.nombre).toBe('Burbú');
    expect(service.findOne(99)).toBeUndefined();
  });

  it('increments the selected creature likes', () => {
    const service = new CriaturasService();

    expect(service.darLike(1)?.likes).toBe(1);
    expect(service.findOne(1)?.likes).toBe(1);
    expect(service.darLike(99)).toBeUndefined();
  });
});
