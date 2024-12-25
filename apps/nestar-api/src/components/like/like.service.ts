import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { lookupFavorite } from '../../libs/config';
import { Like, MeLiked } from '../../libs/dto/like/like';
import { LikeInput } from '../../libs/dto/like/like.input';
import { Properties } from '../../libs/dto/property/property';
import { OrdinaryInquiry } from '../../libs/dto/property/property.input';
import { T } from '../../libs/types/common';
import { Message } from '../../libs/types/enums/common.enum';
import { LikeGroup } from '../../libs/types/enums/like.enum';

@Injectable()
export class LikeService {
    constructor(@InjectModel("Like") private readonly likeModel: Model<Like>){} 


    public async toggleLike(input:LikeInput):Promise<number>{
        console.log("Exxecuted")
        const search = {
            memberId: input.memberId,
            likeRefId: input.likeRefId,
        }
        const exist = await this.likeModel.findOne(search).exec()
        let modifier = 1
        if(exist){
            await this.likeModel.findOneAndDelete(search).exec();
            modifier = -1
        } else{
            try{
                await this.likeModel.create(input);
            } catch(err){
                console.log("Error LikeService Module", err.message);
                throw new BadRequestException(Message.CREATE_FAILED)
            }
        }
        console.log(`Like modifier ${modifier}`)
        return modifier;
    }

    public async checkLikeExistence(input: LikeInput):Promise<MeLiked[]>{
        const {memberId, likeRefId} = input;
        const result = await this.likeModel.findOne({memberId: memberId, likeRefId: likeRefId}).exec();
        return result ? [{memberId: memberId, likeRefId:likeRefId, myFavorite: true}]  : []
    }   

    public async getFavoriteProperties(memberId:ObjectId, inquiry:OrdinaryInquiry):Promise<Properties>{
        const {page, limit} = inquiry;
        const match:T = {likeGroup:LikeGroup.PROPERTY, memberId: memberId};
        
        const data: T = await this.likeModel.aggregate([
            {$match: match},
            {$sort: {updatedAt: -1}},
            {
                $lookup: {
                    from: "properties",
                    localField: "likeRefId",
                    foreignField: "_id",
                    as: "favoriteProperty",
                }
            },
            {$unwind: "$favoriteProperty"},
            {
                $facet: {
                    list: [
                        {$skip: (page -1) * limit},
                        {$limit: limit},
                        lookupFavorite,
                        {$unwind: "$favoriteProperty.memberData"}
                    ],
                    metaCounter: [{$count: 'total'}]
                }
            }
        ]).exec();
        console.log(data);
        const result: Properties = {list: [], metaCounter: data[0].metaCounter}
        result.list = data[0].list.map((ele) => ele.favoriteProperty)
        console.log(result);
        return result;
    }
}
