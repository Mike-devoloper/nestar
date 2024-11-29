import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { printSchema } from 'graphql';
import { Model } from 'mongoose';
import { Member } from '../../libs/dto/member';
import { MemberInput } from '../../libs/dto/member.input';

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

    public async updateMember():Promise<string> {
        return "updateMember exxecuted" 
    }

    public async login():Promise<string> {
        return "login exxecuted" 
    }

    public async getMember():Promise<string> {
        return "login exxecuted" 
    }
}
