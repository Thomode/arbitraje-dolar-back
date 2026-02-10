import { Module } from '@nestjs/common';
import { DolarModule } from './dolar/dolar.module';

@Module({
  imports: [DolarModule],
})
export class AppModule { }
