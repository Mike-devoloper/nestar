import {UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query} from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { shapeIntoMongoDbObjectId } from '../../libs/config';
import { Follower, Followers, Followings } from '../../libs/dto/follow/follow';
import { FollowInquiry } from '../../libs/dto/follow/follow.input';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { WithoutGuard } from '../auth/guards/without.guard';
import { FollowService } from './follow.service';

@Resolver()
export class FollowResolver {
    constructor(private readonly followService: FollowService){}



    @UseGuards(AuthGuard)
    @Mutation(() => Follower)
    public async subscribe(@Args("input") input: string, @AuthMember('_id') memberId: ObjectId):Promise<Follower> {
        console.log("Mutation Subscribe GraphQl APi")
        const followingId = shapeIntoMongoDbObjectId(input);
        return await this.followService.subscribe(followingId, memberId);
    }

    @UseGuards(AuthGuard)
    @Mutation((returns) => Follower)
    public async unsubscribe(@Args("input") input: string, @AuthMember('_id') memberId: ObjectId):Promise<Follower> {
        console.log("Mutation UnSubscribe GraphQl APi")
        const followingId = shapeIntoMongoDbObjectId(input);
        return await this.followService.unsubscribe(followingId, memberId);
    }

    @UseGuards(WithoutGuard)
    @Query((returns) => Followings)
    public async getMemberFollowings(@Args("input") input: FollowInquiry, @AuthMember('_id') memberId: ObjectId):Promise<Followings> {
        console.log("Query getMemberFollowings GraphQl APi")
        const {followerId} = input.search;
        input.search.followerId = shapeIntoMongoDbObjectId(followerId);
        return await this.followService.getMemberFollowings(memberId, input);
    }

    @UseGuards(WithoutGuard)
    @Query((returns) => Followers)
    public async getMemberFollowers(@Args("input") input: FollowInquiry, @AuthMember('_id') memberId: ObjectId):Promise<Followers> {
        console.log("Query getMemberFollowings GraphQl APi")
        const {followingId} = input.search;
        input.search.followingId = shapeIntoMongoDbObjectId(followingId);
        return await this.followService.getMemberFollowers(memberId, input);
    }

}
