import { ApiProperty } from '@nestjs/swagger';

export class Dolar {
  @ApiProperty()
  precioVenta: number;

  @ApiProperty()
  precioCompra: number;

  @ApiProperty()
  fecha: Date;

  @ApiProperty()
  plataforma: string;

  @ApiProperty()
  esConfiable: boolean;
}