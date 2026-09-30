import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MensajeController } from './mensaje/mensaje.controller.js';
import { MensajeService } from './mensaje/mensaje.service.js';
import { ProductosController } from './productos/productos.controller.js';
import { ProductosService } from './productos/productos.service.js';

@Module({
  imports: [],
  controllers: [AppController, MensajeController, ProductosController],
  providers: [AppService, MensajeService, ProductosService],
})
export class AppModule {}
