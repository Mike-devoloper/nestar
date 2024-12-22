import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { MemberAuth, MemberStatus, MemberType } from "../types/enums/member.enums";
import { MeFollowed } from "./follow/follow";
import { MeLiked } from "./like/like";


@ObjectType()
export class Member {
    @Field(() => String)
    _id: ObjectId

    @Field(() => MemberType)
    memberType: MemberType

    @Field(() => MemberAuth)
    memberAuthType: MemberAuth

    @Field(() => MemberStatus)
    memberStatus: MemberStatus

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

    @Field(() => String, {nullable: true})
    accessToken?: string;

    @Field(() => [MeLiked], {nullable: true})
    meLiked?: MeLiked[]

    @Field(() => [MeFollowed], {nullable: true})
    meFollowed?: MeFollowed[]
}

@ObjectType()
export class Members {
    @Field(() => [Member])
    list: Member[];
    
    @Field(() => [TotalCounter], {nullable: true})
    metaCounter: TotalCounter[];
}

@ObjectType()
export class TotalCounter {
    @Field(() => Int, {nullable: true})
    total?: number;
}

