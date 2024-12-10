import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { ObjectId } from "mongoose";
import { ViewGroup } from "../../types/enums/view.enum";



@InputType()
export class ViewInput {
    @IsNotEmpty()
    @Field(() => ViewGroup)
    viewGroup: ViewGroup;

    @IsNotEmpty()
    @Field(() => String)
    viewRefId: ObjectId;

    @IsNotEmpty()
    @Field(() => ViewGroup)
    memberId:  ObjectId;
    
}