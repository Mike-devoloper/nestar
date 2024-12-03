import { InternalServerErrorException, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Member } from '../../libs/dto/member';
import { LoginInput, MemberInput } from '../../libs/dto/member.input';
import { MemberService } from './member.service';

@Resolver()
export class MemberResolver {
    constructor(private readonly memberservice: MemberService){}

    @Mutation(() => Member)
    public async signup(@Args("input") input:MemberInput ):Promise<Member> {
        try {
            console.log("Mutatiion: signup")
            console.log("input: ", input);
            return this.memberservice.signup(input);
        } catch (err) {
            console.log("Error signUp", err)
            throw new InternalServerErrorException
        }
    }
    @Mutation(() => Member)
    public async  login(@Args("input") input:LoginInput):Promise<Member> {
        try {
            console.log("Mutatiion: login")
            return this.memberservice.login(input);
        } catch(err) {
            console.log("Error ", err)
            throw new InternalServerErrorException
        }
    }

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

}
