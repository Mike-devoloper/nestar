import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { printSchema } from 'graphql';
import { Model } from 'mongoose';
import { Member } from '../../libs/dto/member';
import { LoginInput, MemberInput } from '../../libs/dto/member.input';
import { Message } from '../../libs/types/enums/common.enum';
import { MemberStatus } from '../../libs/types/enums/member.enums';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MemberService {
    constructor(@InjectModel('Member') private readonly memberModel: Model<Member>, private readonly authservice: AuthService){}
    public async signup(input: MemberInput):Promise<Member> {
        input.memberPassword = await this.authservice.hashPassword(input.memberPassword)
        try {
            const result = await this.memberModel.create(input)
            result.accessToken = await this.authservice.createToken(result);
            console.log("accessToken ", result);
        return result
        } catch (err) {
            console.log("error ServiceModel: ", err.message)
            throw new BadRequestException(Message.USED_MEMBER_NICK_OR_PHONE);
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

        
        const isMatch = await this.authservice.comparePasswords(input.memberPassword, response.memberPassword);
        if(!isMatch) throw new InternalServerErrorException(Message.WRONG_PASSWORD) 
        response.accessToken = await this.authservice.createToken(response);

        
        return response;
    }

    public async updateMember():Promise<string> {
        return "login exxecuted" 
    }

    public async getMember():Promise<string> {
        return "login exxecuted" 
    }
}
