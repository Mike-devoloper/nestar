import {UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { shapeIntoMongoDbObjectId } from '../../libs/config';
import { Comment, Comments } from '../../libs/dto/comment/comment';
import { CommentInput, CommentsInquiry } from '../../libs/dto/comment/comment.input';
import { CommentUpdate } from '../../libs/dto/comment/comment.update';
import { MemberType } from '../../libs/types/enums/member.enums';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { WithoutGuard } from '../auth/guards/without.guard';
import { CommentService } from './comment.service';

@Resolver()
export class CommentResolver {
    constructor(private readonly commentService: CommentService) {}


    @UseGuards(AuthGuard)
    @Mutation((returns) => Comment)
    public async createComment(@Args("input") input: CommentInput, @AuthMember("_id") memberId: ObjectId):Promise<Comment>{
        console.log("Mutation CreateComment");
        return await this.commentService.createComment(memberId, input)
    }

    @UseGuards(AuthGuard)
    @Mutation((returns) => Comment)
    public async updateComment(@Args("input") input: CommentUpdate, @AuthMember("_id") memberId: ObjectId):Promise<Comment>{
        console.log("Mutation UpdateComment");
        input._id = shapeIntoMongoDbObjectId(input._id)
        return await this.commentService.updateComment(memberId, input)
    }

    @UseGuards(WithoutGuard)
    @Query((returns) => Comments)
    public async getComments(@Args("input") input: CommentsInquiry, @AuthMember("_id") memberId: ObjectId):Promise<Comments>{
        console.log("Query getComments");
        input.search.commentRefId = shapeIntoMongoDbObjectId(input.search.commentRefId)
        const result = await this.commentService.getComments(memberId, input)
        return result;
    }

    //Admin 

    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => Comment)
    public async removeCommentByAdmin(@Args("commentId") input: string):Promise<Comment>{
        console.log("Mutuation removeCommentByAdmin")
        const commentId = shapeIntoMongoDbObjectId(input);
        return await this.commentService.removeCommentByAdmin(commentId);
    }
}
