import { Injectable } from '@nestjs/common';
import { CriptoYaService } from './criptoya.service';
import { Observable } from 'rxjs';
import { Dolar } from '../interfaces/dolar';
import { ComparaDolarService } from './compara-dolar.service';
import { ResultadoComparacion } from '../interfaces/resultado-comparacion';

@Injectable()
export class DolarService {

  constructor(
    private readonly criptoYaService: CriptoYaService,
    private readonly comparaDolarService: ComparaDolarService,
  ) { }

  obtenerCotizacionesDolar(): Observable<any> {
    return this.criptoYaService.obtenerCotizacionesDolar();
  }

  async obtenerDolarUsdt(): Promise<Dolar[]> {
    return this.criptoYaService.obtenerDolarUsdt();
  }

  async obtenerDolarOficial(): Promise<Dolar[]> {
    return this.comparaDolarService.obtenerDolarOficial();
  }

  comparar(capitalInicial: number, cotizaciones: Dolar[]): ResultadoComparacion | null {
    if (!cotizaciones || cotizaciones.length === 0) {
      return null;
    }

    // Filtrar por plataformas confiables
    const cotizacionesConfiables = cotizaciones.filter(q => q.esConfiable);

    // Filtrar cotizaciones invalidas
    const cotizacionesValidas = cotizacionesConfiables.filter(q => q.precioVenta > 0 && q.precioCompra > 0);

    if (cotizacionesValidas.length === 0) {
      return null;
    }

    const mejorCompra = cotizacionesValidas.reduce((prev, curr) =>
      prev.precioCompra < curr.precioCompra ? prev : curr
    );

    const mejorVenta = cotizacionesValidas.reduce((prev, curr) =>
      prev.precioVenta > curr.precioVenta ? prev : curr
    );

    // Calcular ganancia y porcentaje
    const capitalInicialUsd = capitalInicial / mejorCompra.precioCompra;
    const capitalInicialUsdT = capitalInicialUsd / 1.0235;
    const capitalFinal = capitalInicialUsdT * mejorVenta.precioVenta;
    const ganancia = capitalFinal - capitalInicial;
    const porcentaje = (ganancia / capitalInicial) * 100;

    const precioCompraUsdt = capitalInicial / capitalInicialUsdT;
    const spread = mejorVenta.precioVenta - precioCompraUsdt;

    return {
      compra: mejorCompra,
      venta: mejorVenta,
      ganancia: Math.round(ganancia * 100) / 100,
      porcentaje: Math.round(porcentaje * 100) / 100,
      capitalInicial: Number(capitalInicial),
      capitalFinal: Math.round(capitalFinal * 100) / 100,
      spread: Math.round(spread * 100) / 100,
      precioCompraUsdt: Math.round(precioCompraUsdt * 100) / 100
    };
  }
}
