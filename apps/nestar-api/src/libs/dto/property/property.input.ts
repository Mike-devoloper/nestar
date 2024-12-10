import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsOptional, Length, Min } from "class-validator";
import { ObjectId } from "mongoose";
import { PropertyLocation, PropertyType } from "../../types/enums/property.enum";

@InputType()
export class PropertyInput {
    @IsNotEmpty()
    @Field(() => PropertyType)
    propertyType: PropertyType;

    @IsNotEmpty()
    @Field(() => PropertyLocation)
    propertyLocation: PropertyLocation;

    @IsNotEmpty()
    @Length(3, 100)
    @Field(() => String)
    propertyAddress: string;

    @IsNotEmpty()
    @Length(3, 100)
    @Field(() => String)
    propertyTitle: string;
    
    @IsNotEmpty()
    @Field(() => Number)
    propertyPrice: number;

    @IsNotEmpty()
    @Field(() => Number)
    propertySquare: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Field(() => Int)
    propertyBeds: number

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Field(() => Int)
    propertyRooms: number
    
    @IsNotEmpty()
    @Field(() => [String])
    propertyImages: string[];

    @IsOptional()
    @Length(5, 500)
    @Field(() => String, {nullable: true})
    propertyDesc?: String

    @IsOptional()
    @Length(5, 500)
    @Field(() => Boolean, {nullable: true})
    propertyBarter?: String

    @IsOptional()
    @Length(5, 500)
    @Field(() => Boolean, {nullable: true})
    propertyRent?: String

    memberId?: ObjectId
  
}