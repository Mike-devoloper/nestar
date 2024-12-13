import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { shapeIntoMongoDbObjectId } from '../../libs/config';
import { Properties, Property } from '../../libs/dto/property/property';
import { AgentPropertyInquiry, AllPropertiesInquiry, PropertiesInquiry, PropertyInput } from '../../libs/dto/property/property.input';
import { PropertyUpdate } from '../../libs/dto/property/property.update';
import { MemberType } from '../../libs/types/enums/member.enums';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { WithoutGuard } from '../auth/guards/without.guard';
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


    @UseGuards(WithoutGuard)
    @Query((returns) => Property)
    public async getProperty(@Args('propertyId') input: string, @AuthMember('_id') memberId: ObjectId):Promise<Property> {
        console.log("Query: getProperty")
        const propertyId = shapeIntoMongoDbObjectId(input);
        return await this.propertyService.getProperty(memberId, propertyId);
    }


    @Roles(MemberType.AGENT)
    @UseGuards(RolesGuard)
    @Mutation((returns) => Property)
    public async updateProperty(@Args('input') input: PropertyUpdate, @AuthMember('_id') memberId: ObjectId):Promise<Property> {
        console.log("Query: getProperty")
        input._id = shapeIntoMongoDbObjectId(input._id);
        return await this.propertyService.updateProperty(memberId, input);
    }


    
    @UseGuards(WithoutGuard)
    @Query((returns) => Properties)
    public async getProperties(@Args('input') input: PropertiesInquiry, @AuthMember('_id') memberId: ObjectId):Promise<Properties> {
        console.log("Query: getProperty");
        return await this.propertyService.getProperties(memberId, input);
    }

    @Roles(MemberType.AGENT)
    @UseGuards(RolesGuard)
    @Query((returns) => Properties)
    public async getAgentProperties(@Args('input') input: AgentPropertyInquiry, @AuthMember("_id") memberId: ObjectId):Promise<Properties>{
        console.log("Query getPropertyAgenst")
        return await this.propertyService.getAgentProperties(memberId, input);
    }

    //Admin 
    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Query((returns) => Properties)
    public async getAllPropertiesByAdmin(@Args('input') input: AllPropertiesInquiry, @AuthMember("_id") memberId: ObjectId):Promise<Properties> {
        console.log("Query getAllPropertiesByAdmin")
        return await this.propertyService.getAllPropertiesByAdmin(memberId, input);
    }   
}