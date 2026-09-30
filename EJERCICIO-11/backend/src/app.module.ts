import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HeroesController } from './heroes/heroes.controller.js';
import { HeroesService } from './heroes/heroes.service.js';
import { MascotasController } from './mascotas/mascotas.controller.js';
import { MascotasService } from './mascotas/mascotas.service.js';
import { MensajeController } from './mensaje/mensaje.controller.js';
import { MensajeService } from './mensaje/mensaje.service.js';
import { ProductosController } from './productos/productos.controller.js';
import { ProductosService } from './productos/productos.service.js';

@Module({
  imports: [],
  controllers: [
    AppController,
    MensajeController,
    ProductosController,
    HeroesController,
    MascotasController,
  ],
  providers: [AppService, MensajeService, ProductosService, HeroesService, MascotasService],
})
export class AppModule {}
