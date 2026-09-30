import { Injectable } from '@nestjs/common';

export type Producto = {
  id: number;
  nombre: string;
  precio: number;
};

@Injectable()
export class ProductosService {
  private readonly productos: Producto[] = [
    { id: 1, nombre: 'Camiseta', precio: 15 },
    { id: 2, nombre: 'Gorra', precio: 10 },
  ];

  findAll(): Producto[] {
    return this.productos;
  }

  crear(producto: { nombre: string; precio: number }): Producto {
    const nuevo = {
      id: this.productos.length + 1,
      nombre: producto.nombre,
      precio: producto.precio,
    };
    this.productos.push(nuevo);
    return nuevo;
  }
}
