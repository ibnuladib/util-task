import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pricing } from 'src/pricing/pricing.entity';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminSeedService } from './adminseed.service';


@Module({
  imports: [TypeOrmModule.forFeature([Admin, Pricing])],
  providers: [AdminService, AdminSeedService],
  controllers: [AdminController],
  exports: [],
})
export class AdminModule {}