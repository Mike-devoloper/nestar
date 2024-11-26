import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberService {

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
