import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pricing } from 'src/pricing/pricing.entity';
import { Admin } from './admin.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Admin, Pricing])],
  providers: [],
  controllers: [],
  exports: [],
})
export class AdminModule {}