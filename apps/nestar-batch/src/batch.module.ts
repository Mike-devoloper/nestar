import { Module } from '@nestjs/common';
import { BatchController } from './batch.controller';
import { NestarBatchService } from './batch.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { Property } from 'apps/nestar-api/src/libs/dto/property/property';
import { Member } from 'apps/nestar-api/src/libs/dto/member';
import PropertySchema from 'apps/nestar-api/src/schemas/Property.model';
import MemberSchema from 'apps/nestar-api/src/schemas/Member.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: "Property", schema: PropertySchema }]), MongooseModule.forFeature([{name: "Member", schema: MemberSchema }]),
  ConfigModule.forRoot(), DatabaseModule, ScheduleModule.forRoot()],
  controllers: [BatchController],
  providers: [NestarBatchService],
})
export class NestarBatchModule {}
