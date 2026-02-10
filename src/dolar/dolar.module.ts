import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DolarService } from './services/dolar.service';
import { DolarController } from './dolar.controller';
import { CriptoYaService } from './services/criptoya.service';
import { ComparaDolarService } from './services/compara-dolar.service';

@Module({
  imports: [HttpModule],
  controllers: [DolarController],
  providers: [DolarService, CriptoYaService, ComparaDolarService],
  exports: [ComparaDolarService], // Exportarlo por si acaso
})
export class DolarModule { }
