import { ProductosService } from './productos.service.js';

describe('ProductosService', () => {
  it('starts with the initial products', () => {
    const service = new ProductosService();

    expect(service.findAll()).toEqual([
      { id: 1, nombre: 'Camiseta', precio: 15 },
      { id: 2, nombre: 'Gorra', precio: 10 },
    ]);
  });

  it('creates a product with the next ID and adds it to the list', () => {
    const service = new ProductosService();

    const creado = service.crear({ nombre: 'Mochila', precio: 29.99 });

    expect(creado).toEqual({ id: 3, nombre: 'Mochila', precio: 29.99 });
    expect(service.findAll()).toContainEqual(creado);
  });
});
