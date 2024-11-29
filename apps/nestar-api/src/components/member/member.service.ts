import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { printSchema } from 'graphql';
import { Model } from 'mongoose';
import { Member } from '../../libs/dto/member';
import { LoginInput, MemberInput } from '../../libs/dto/member.input';
import { Message } from '../../libs/types/enums/common.enum';
import { MemberStatus } from '../../libs/types/enums/member.enums';

@Injectable()
export class MemberService {
    constructor(@InjectModel('Member') private readonly memberModel: Model<Member>){}
    public async signup(input: MemberInput):Promise<Member> {
        //password Hash
        try {
            const result = await this.memberModel.create(input)
        //Token auth
        return result
        } catch (err) {
            console.log("Error on signup service", err)
            throw new BadRequestException
        }
    }

    public async login(input: LoginInput):Promise<Member> {
        const {memberNick, memberPassword} = input;
        const response: Member = await this.memberModel.findOne({memberNick: memberNick}).select('+memberPassword').exec()
        if(!response || response.memberStatus === MemberStatus.DELETE) {
            throw new InternalServerErrorException(Message.NO_MEMBER)
        } else if (response.memberStatus === MemberStatus.BLOCK) {
            throw new InternalServerErrorException(Message.BLOCKED_USER)
        }

        //TODO compare passwords
        const isMatch = memberPassword === response.memberPassword;
        if(!isMatch) throw new InternalServerErrorException(Message.WRONG_PASSWORD) 
        return response;
    }

    public async updateMember():Promise<string> {
        return "login exxecuted" 
    }

    public async getMember():Promise<string> {
        return "login exxecuted" 
    }
}
