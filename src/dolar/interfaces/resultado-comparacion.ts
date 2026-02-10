import { ApiProperty } from '@nestjs/swagger';
import { Dolar } from './dolar';

export class ResultadoComparacion {
  @ApiProperty({ type: Dolar })
  compra: Dolar;

  @ApiProperty({ type: Dolar })
  venta: Dolar;

  @ApiProperty()
  ganancia: number;

  @ApiProperty()
  porcentaje: number;

  @ApiProperty()
  capitalInicial: number;

  @ApiProperty()
  capitalFinal: number;

  @ApiProperty()
  spread: number;

  @ApiProperty()
  precioCompraUsdt: number;
}
