import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MemberSchema from '../../schemas/Member.schema';
import { AuthModule } from '../auth/auth.module';
import { LikeModule } from '../like/like.module';
import { ViewModule } from '../view/view.module';
import { MemberResolver } from './member.resolver';
import { MemberService } from './member.service';

@Module({
  imports: [MongooseModule.forFeature([{name: "Member", schema: MemberSchema}]), AuthModule, ViewModule, LikeModule],
  providers: [
    MemberResolver, 
    MemberService,],
    exports: [MemberService]
  })
export class MemberModule {}
