import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { shapeIntoMongoDbObjectId } from '../../libs/config';
import { BoardArticle, BoardArticles } from '../../libs/dto/board-article/board-article';
import { BoardArticleInput, BoardArticlesInquiry } from '../../libs/dto/board-article/board-article.input';
import { BoardArticleUpdate } from '../../libs/dto/board-article/board-article.update';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { WithoutGuard } from '../auth/guards/without.guard';
import { BoardArticleService } from './board-article.service';

@Resolver()
export class BoardArticleResolver {
    constructor(private readonly boardArticleService: BoardArticleService){}
 
        @UseGuards(AuthGuard)
        @Mutation((returns) => BoardArticle)
        public async createBoardArticle(@Args("input") input: BoardArticleInput, @AuthMember('_id') memberId: ObjectId): Promise<BoardArticle>{
            console.log("Mutation CreateBoardArticle");
            return await this.boardArticleService.createBoardArticle(memberId, input);
        }

        @UseGuards(WithoutGuard)
        @Query((returns) => BoardArticle)
        public async getBoardArticle(@Args("articleId") input: string, @AuthMember('_id') memberId: ObjectId):Promise<BoardArticle> {
            console.log("Query GetBoardArticle");
            const articleId = shapeIntoMongoDbObjectId(input)
            return await this.boardArticleService.getBoardArticle(memberId, input);
        }

        @UseGuards(AuthGuard)
        @Mutation((returns) => BoardArticle)
        public async updateBoardArticle(@Args("input") input: BoardArticleUpdate, @AuthMember('_id') memberId: ObjectId):Promise<BoardArticle> {
            console.log("Query GetBoardArticle");
            input._id = shapeIntoMongoDbObjectId(input._id)
            return await this.boardArticleService.updateBoardArticle(memberId, input);
        }


        @UseGuards(WithoutGuard)
        @Mutation((returns) => BoardArticles)
        public async getBoardArticles(@Args("input") input: BoardArticlesInquiry, @AuthMember('_id') memberId: ObjectId):Promise<BoardArticles> {
            console.log("Query GetBoardArticles");
            return await this.boardArticleService.getBoardArticles(memberId, input);
        }


}
