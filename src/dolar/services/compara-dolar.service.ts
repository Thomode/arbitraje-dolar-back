import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Dolar } from '../interfaces/dolar';
import { PLATAFORMAS_CONFIABLES } from '../constants/plataforma-confiales';

@Injectable()
export class ComparaDolarService {
  constructor(private readonly httpService: HttpService) { }

  async obtenerDolarOficial(): Promise<Dolar[]> {
    const respuesta = await lastValueFrom(
      this.httpService.get('https://api.comparadolar.ar/usd')
    );
    const datos = respuesta.data;
    const resultado: Dolar[] = [];

    if (Array.isArray(datos)) {
      for (const item of datos) {
        const plataforma = item.name || item.prettyName;
        const esBrubank = plataforma.toLowerCase().includes('brubank');
        const divisor = esBrubank ? 1000 : 1;

        resultado.push({
          plataforma: plataforma,
          precioVenta: item.bid / divisor,
          precioCompra: item.ask / divisor,
          fecha: new Date(), // La API no provee timestamp por item en formato simple
          esConfiable: PLATAFORMAS_CONFIABLES.includes(plataforma.toLowerCase()),
        });
      }
    }

    return resultado;
  }
}
