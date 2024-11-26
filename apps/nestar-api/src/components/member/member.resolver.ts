import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';

@Resolver()
export class MemberResolver {
    constructor(private readonly memberservice: MemberService){}

    @Mutation(() => String)
    public async signup ():Promise<string> {
        console.log("Mutatiion: signup")
        return this.memberservice.signup();
    }
    @Mutation(() => String)
    public async  login():Promise<string> {
        console.log("Mutatiion: login")
        return this.memberservice.login();
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
