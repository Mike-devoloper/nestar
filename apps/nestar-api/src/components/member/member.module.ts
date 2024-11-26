import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MemberSchema from '../../schemas/Member.schema';
import { MemberResolver } from './member.resolver';
import { MemberService } from './member.service';

@Module({
  imports: [MongooseModule.forFeature([{name: "Member", schema: MemberSchema}])],
  providers: [
    MemberResolver, 
    MemberService,]
  })
export class MemberModule {}
