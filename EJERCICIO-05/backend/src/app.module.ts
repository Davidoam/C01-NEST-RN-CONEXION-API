import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MensajeController } from './mensaje/mensaje.controller.js';
import { MensajeService } from './mensaje/mensaje.service.js';

@Module({
  imports: [],
  controllers: [AppController, MensajeController],
  providers: [AppService, MensajeService],
})
export class AppModule {}
