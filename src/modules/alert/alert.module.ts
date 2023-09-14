import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertController } from './alert.controller';
import { AlertRepository } from './alert.repository';
import { AlertService } from './alert.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlertRepository])],
  controllers: [AlertController],
  providers: [AlertService],
})
export class AlertModule {}
