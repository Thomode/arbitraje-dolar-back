import { Controller, Get, Query } from '@nestjs/common';
import { DolarService } from './services/dolar.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Dolar } from './interfaces/dolar';
import { ResultadoComparacion } from './interfaces/resultado-comparacion';

@ApiTags('dolar')
@Controller('dolar')
export class DolarController {
  constructor(
    private readonly dolarService: DolarService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Obtener cotizaciones del Dolar' })
  @ApiResponse({ status: 200, description: 'Retorna todas las cotizaciones del dolar.' })
  obtenerCotizacionesDolar() {
    return this.dolarService.obtenerCotizacionesDolar();
  }

  @Get('usdt')
  @ApiOperation({ summary: 'Obtener cotizaciones USDT' })
  @ApiResponse({ status: 200, description: 'Retorna todas las cotizaciones USDT.', type: [Dolar] })
  async obtenerDolarUsdt() {
    return this.dolarService.obtenerDolarUsdt();
  }

  @Get('oficial')
  @ApiOperation({ summary: 'Obtener cotizaciones Dolar Oficial' })
  @ApiResponse({ status: 200, description: 'Retorna todas las cotizaciones del Dolar Oficial.', type: [Dolar] })
  async obtenerDolarOficial() {
    return this.dolarService.obtenerDolarOficial();
  }

  @Get('comparar')
  @ApiOperation({ summary: 'Comparar Dolar' })
  @ApiResponse({ status: 200, description: 'Retorna resultado de la comparacion.', type: ResultadoComparacion })
  async compararDolar(@Query('capitalInicial') capitalInicial: number) {
    const dolarUsd = await this.dolarService.obtenerDolarUsdt();
    const dolarOficial = await this.dolarService.obtenerDolarOficial();
    const cotizaciones = [...dolarUsd, ...dolarOficial];

    return this.dolarService.comparar(capitalInicial, cotizaciones);
  }
}
