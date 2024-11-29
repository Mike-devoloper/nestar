import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { MemberAuth, MemberType } from "../types/enums/member.enums";


@ObjectType()
export class Member {
    @Field(() => String)
    _id: ObjectId

    @Field(() => String)
    memberType: MemberType

    @Field(() => MemberAuth)
    memberAuth: MemberAuth

    @Field(() => String)
    memberNick: string

    @Field(() => String)
    memberPhone: string

    memberPassword?: string;

    @Field(() => String, {nullable: true})
    memberFullName?: string

    @Field(() => String)
    memberImage: string

    @Field(() => String, {nullable: true})
    memberAddress?: string

    @Field(() => String, {nullable: true})
    memberDesc?: string

    @Field(() => Int)
    memberProperties: number

    @Field(() => Int)
    memberFollowers: number

    @Field(() => Int)
    memberFollowings: number

    @Field(() => Int)
    memberArticle: number

    @Field(() => Int)
    memberViews: number

    @Field(() => Int)
    memberPoints: number

    @Field(() => Int)
    memberLikes: number

    @Field(() => Int)
    memberRank: number

    @Field(() => Int)
    memberWarnings: number

    @Field(() => Int)
    memberComments: number

    @Field(() => Int)
    memberBlocks: number

    @Field(() => Date, {nullable: true})
    deletedAt?: Date

    @Field(() => Date)
    updatedAt: Date

    @Field(() => Date)
    createdAt: Date

}