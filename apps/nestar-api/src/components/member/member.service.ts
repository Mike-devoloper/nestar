import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { printSchema } from 'graphql';
import { Model } from 'mongoose';

@Injectable()
export class MemberService {
    constructor(@InjectModel('Member') private readonly memberModel: Model<null>){}
    public async signup():Promise<string> {
        return "signup exxecuted" 
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
