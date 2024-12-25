import { Module } from '@nestjs/common';
import { BatchController } from './batch.controller';
import { NestarBatchService } from './batch.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, ScheduleModule.forRoot()],
  controllers: [BatchController],
  providers: [NestarBatchService],
})
export class NestarBatchModule {}
