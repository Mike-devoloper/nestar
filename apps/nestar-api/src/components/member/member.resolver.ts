import { BadRequestException, InternalServerErrorException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Member, Members } from '../../libs/dto/member';
import { AgentsInquiry, LoginInput, MemberInput } from '../../libs/dto/member.input';
import { AuthGuard } from '../auth/guards/auth.guard';
import { MemberService } from './member.service';
import { Message } from '../../libs/types/enums/common.enum';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/types/enums/member.enums';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberUpdate } from '../../libs/dto/member.update';
import { ObjectId } from 'mongoose';
import { shapeIntoMongoDbObjectId } from '../../libs/config';
import { WithoutGuard } from '../auth/guards/without.guard';

@Resolver()
export class MemberResolver {
    constructor(private readonly memberservice: MemberService){}

    @Mutation(() => Member)
    public async signup(@Args("input") input:MemberInput ):Promise<Member> {
            console.log("Mutatiion: signup")
            console.log("input: ", input);
            return this.memberservice.signup(input);
    }
    @Mutation(() => Member)
    public async  login(@Args("input") input:LoginInput):Promise<Member> {
            console.log("Mutatiion: login")
            return this.memberservice.login(input);
    }

    //Authenticated
    @UseGuards(AuthGuard)
    @Mutation(() => Member)
    public async updateMember(@Args('input') input: MemberUpdate, @AuthMember("_id") memberId: ObjectId):Promise<Member> {
        console.log("Mutatiion: updateMember")
        delete input._id
        return this.memberservice.updateMember(memberId, input);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => String)
    public async checkAuth(@AuthMember("memberNick") memberNick: string):Promise<string> {
        console.log("authmember", memberNick);
        return `Hi ${memberNick}`;
    }


    @Roles(MemberType.USER, MemberType.AGENT)
    @UseGuards(RolesGuard)
    @Mutation(() => String)
    public async checkAuthRoles(@AuthMember() authMember: Member):Promise<string> {
        console.log("authmember", authMember);
        return `Hi ${authMember.memberNick}, You are ${authMember.memberType} (memberId: ${authMember._id})`;
    }

    @UseGuards(WithoutGuard)
    @Query(() => Member)
    public async getMember (@Args('memberId') input: string, @AuthMember('_id') memberId: ObjectId):Promise<Member> {
        console.log("Query: getMember")
        const targetId = shapeIntoMongoDbObjectId(input);
        return this.memberservice.getMember(memberId, targetId);;
    }

    @UseGuards(WithoutGuard)
    @Query(() => Members)
    public async getAgents(@Args('input') input: AgentsInquiry, @AuthMember('_id') memberId: ObjectId):Promise<Members> {
        console.log("Query: getAgents")
        return this.memberservice.getAgents(memberId, input);
    }

    //Authorization ADMIN
    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => String)
    public async getAllMembersByAdmin(@AuthMember() authMember: Member):Promise<string> {
        console.log("Mutatiion: getAllMembersByAdmin")
        console.log("authMember ", authMember.memberType);
        return this.memberservice.getAllMembersByAdmin();
    }

    @Mutation(() => String)
    public async updateAllMembersByAdmin():Promise<string> {
        console.log("Mutatiion: updateAllMembersByAdmin")
        return this.memberservice.updateAllMembersByAdmin();
    }

}
