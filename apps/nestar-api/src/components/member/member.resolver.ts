import { BadRequestException, InternalServerErrorException, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Member } from '../../libs/dto/member';
import { LoginInput, MemberInput } from '../../libs/dto/member.input';
import { Message } from '../../libs/types/enums/common.enum';
import { MemberService } from './member.service';

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
    @Mutation(() => String)
    public async updateMember ():Promise<string> {
        console.log("Mutatiion: updateMember")
        return this.memberservice.updateMember();
    }

    @Query(() => String)
    public async getMember ():Promise<string> {
        console.log("Mutatiion: getMember")
        return this.memberservice.getMember();;
    }

    //Authorization ADMIN
    @Mutation(() => String)
    public async getAllMembersByAdmin():Promise<string> {
        console.log("Mutatiion: getAllMembersByAdmin")
        return this.memberservice.getAllMembersByAdmin();
    }

    @Mutation(() => String)
    public async updateAllMembersByAdmin():Promise<string> {
        console.log("Mutatiion: updateAllMembersByAdmin")
        return this.memberservice.updateAllMembersByAdmin();
    }

}
