import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { Pricing } from './pricing/pricing.entity';
import { Admin } from './admin/admin.entity';

@Module({
  imports: [AdminModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'util_db',
      autoLoadEntities: true,
      synchronize: true,
    }
  ),
  TypeOrmModule.forFeature([Admin, Pricing])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
