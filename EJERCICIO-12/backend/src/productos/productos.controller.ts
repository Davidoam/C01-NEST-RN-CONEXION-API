import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductosService } from './productos.service.js';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Post()
  crear(@Body() producto: { nombre: string; precio: number }) {
    return this.productosService.crear(producto);
  }
}
