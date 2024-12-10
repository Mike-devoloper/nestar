import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { Property } from '../../libs/dto/property/property';
import { PropertyInput } from '../../libs/dto/property/property.input';
import { MemberType } from '../../libs/types/enums/member.enums';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PropertyService } from './property.service';

@Resolver()
export class PropertyResolver {
    constructor(private readonly propertyService: PropertyService) {}
    

    @Roles(MemberType.AGENT)
    @UseGuards(RolesGuard)
    @Mutation(() => Property)
    public async createProperty(@Args('input') input: PropertyInput, @AuthMember('_id') memberId: ObjectId):Promise<Property> {
        console.log("mutattion createProperty");
        input.memberId = memberId;
        return await this.propertyService.createProperty(input) ;
    }
}