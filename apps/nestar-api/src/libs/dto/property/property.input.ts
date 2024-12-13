import { Field, InputType, Int } from "@nestjs/graphql";
import { IsIn, IsInt, IsNotEmpty, IsOptional, Length, Min } from "class-validator";
import { ObjectId } from "mongoose";
import { availableOptions, availablePropertySorts } from "../../config";
import { Direction } from "../../types/enums/common.enum";
import { PropertyLocation, PropertyStatus, PropertyType } from "../../types/enums/property.enum";

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


@InputType()
export class PriceRange {
    @Field(() => Int)
    start: number

    @Field(() => Int)
    end: number
}

@InputType()
export class SquaresRange {
    @Field(() => Int)
    start: number

    @Field(() => Int)
    end: number
}

@InputType()
export class PeriodRange {
    @Field(() => Date)
    start: Date

    @Field(() => Date)
    end: Date
}

@InputType()
class PISearch {
    @IsOptional()
    @Field(() => String, {nullable: true})
    memberId?: ObjectId

    @IsOptional()
    @Field(() => [PropertyLocation], {nullable: true})
    locationList?: PropertyLocation

    @IsOptional()
    @Field(() => [PropertyType], {nullable: true})
    typeList?: PropertyType

    @IsOptional()
    @Field(() => [Int], {nullable: true})
    roomList?: Number[]

    @IsOptional()
    @Field(() => [Int], {nullable: true})
    bedsList?: Number[]

    @IsOptional()
    @IsIn(availableOptions, {each: true})
    @Field(() => [String], {nullable: true})
    options?: string[]

    @IsOptional()
    @Field(() => [PriceRange], {nullable: true})
    pricesRange?: PriceRange

    @IsOptional()
    @Field(() => [PeriodRange], {nullable: true})
    periodRange?: PeriodRange

    @IsOptional()
    @Field(() => [SquaresRange], {nullable: true})
    squaresRange?: SquaresRange

    @IsOptional()
    @Field(() => String, {nullable: true})
    text?: string
}


@InputType()
export class PropertiesInquiry {
    @IsNotEmpty()
    @Min(1)
    @Field(() => Int)
    page: number

    @IsNotEmpty()
    @Min(1)
    @Field(() => Int)
    limit: number

    @IsOptional()
    @IsIn(availablePropertySorts)
    @Field(() => String, {nullable: true})
     sort?: string

     @IsOptional()
    @Field(() => Direction, {nullable: true})
     direction?: Direction

     @IsNotEmpty()
     @Field(() => PISearch, {nullable: true})
     search: PISearch

}

@InputType()
class APISearch {
    @IsOptional()
    @Field(() => PropertyStatus, {nullable: true})
    propertyStatus?: PropertyStatus 
}

@InputType()
export class AgentPropertyInquiry {
    @IsNotEmpty()
    @Min(1)
    @Field(() => Int)
    page: number

    @IsNotEmpty()
    @Min(1)
    @Field(() => Int)
    limit: number

    @IsNotEmpty()
    @IsIn(availablePropertySorts)
    @Field(() => String, {nullable: true})
    sort?: string

    @IsOptional()
    @Field(() => Direction, {nullable: true})
    direction?: Direction

    @IsNotEmpty()
    @Field(() => APISearch)
    search: APISearch

}
