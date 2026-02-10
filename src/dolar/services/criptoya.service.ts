import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable, lastValueFrom } from 'rxjs';
import { Dolar } from '../interfaces/dolar';
import { PLATAFORMAS_CONFIABLES } from '../constants/plataforma-confiales';

@Injectable()
export class CriptoYaService {
  constructor(private readonly httpService: HttpService) { }

  obtenerCotizacionesDolar(): Observable<any> {
    return this.httpService
      .get('https://criptoya.com/api/dolar')
      .pipe(map((respuesta) => respuesta.data));
  }

  async obtenerDolarUsdt(): Promise<Dolar[]> {
    const respuesta = await lastValueFrom(
      this.httpService.get('https://criptoya.com/api/USDT/ARS/0.1'),
    );
    const datos = respuesta.data;
    const resultado: Dolar[] = [];

    for (const plataforma in datos) {
      if (Object.prototype.hasOwnProperty.call(datos, plataforma)) {
        const detalles = datos[plataforma];
        // Asegurarse de procesar solo objetos con los campos esperados
        if (detalles.ask && detalles.bid && detalles.time) {
          resultado.push({
            plataforma: plataforma,
            precioVenta: detalles.bid,
            precioCompra: detalles.ask,
            fecha: new Date((detalles.time - 3 * 3600) * 1000),
            esConfiable: PLATAFORMAS_CONFIABLES.includes(plataforma.toLowerCase()),
          });
        }
      }
    }
    return resultado;
  }
}
