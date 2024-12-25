import {ObjectId} from "bson"


// IMAGE CONFIGURATION (config.js)
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { T } from "./types/common";

export const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
export const getSerialForImage = (filename: string) => {
	const ext = path.parse(filename).ext;
	return uuidv4() + ext;
};


export const availableAgentSort = ["createdAt", "updatedAt", "memberRank", "memberLikes", "memberViews"]
export const availableMemberSort = ["createdAt", "updatedAt",  "memberLikes", "memberViews"]
export const shapeIntoMongoDbObjectId = (target: any) => {
return typeof target === "string" ? new ObjectId(target) : target;
}

export const availableOptions = ['propertyBarter', 'propertyRent'];
export const availablePropertySorts = [
    'createdAt',
    'updatedAt',
    'propertyLikes',
    'propertyViews',
    'propertyRank',
    'propertyPrice',
];


export const lookupAuthMemberLiked = (memberId: T, targetRefId:string = "$_id" ) => {
    return {
        $lookup: {
            from: "likes",
            let: {
                localLikeRefId: targetRefId,
                localMemberId: memberId,
                localFavorite: true
            },
            pipeline: [
                {$match: {
                    $expr: {
                        $and:[{$eq:["$likeRefId", "$$localLikeRefId"]}, {$eq:["$memberId", "$$localMemberId"]}]
                    }
                }},
                {
                    $project: {
                        _id: 0,
                        memberId: 1,
                        likeRefId: 1,
                        myFovorite: "$$localFavorite"
                    }
                }
            ],
            as: "meLiked"
        } 
    }
}

interface lookupAuthMemberFollowed {
    followerId: T,
    followingId: string;
}

export const lookupAuthMemberFollowed = (input: lookupAuthMemberFollowed) => {
    const {followerId, followingId } = input;
    return {
        $lookup: {
            from: "follows",
            let: {
                localFollowerRefId: followerId,
                localFollowingId: followingId,
                localFavorite: true
            },
            pipeline: [
                {$match: {
                    $expr: {
                        $and:[{$eq:["$followerId", "$$localFollowerRefId"]}, {$eq:["$followingId", "$$localFollowingId"]}]
                    }
                }},
                {
                    $project: {
                        _id: 0,
                        memberId: 1,
                        likeRefId: 1,
                        myFollowing: "$$localFavorite"
                    }
                }
            ],
            as: "meFollowed"
        } 
    }
}

export const availableArticleSorts = ["createdAt", "updatedAt", "articleLikes", "articleViews"];

export const lookupMember = {
    $lookup: {
        from: "members",
        localField: 'memberId',
        foreignField: '_id',
        as: 'memberData'
    }
}

export const lookupFollowingData = {
    $lookup: {
        from: "members",
        localField: 'followingId',
        foreignField: '_id',
        as: 'followingData'
    }
}

export const lookupFollowerData = {
    $lookup: {
        from: "members",
        localField: 'followerId',
        foreignField: '_id',
        as: 'followerData'
    }
}

export const lookupFavorite = {
    $lookup: {
        from: "members",
        localField: 'favoriteProperty.memberId',
        foreignField: '_id',
        as: 'favoriteProperty.memberData'
    }
}

export const lookupVisit = {
    $lookup: {
        from: "members",
        localField: 'visitedProperty.memberId',
        foreignField: '_id',
        as: 'visitedProperty.memberData'
    }
}

export const availableCommentSorts = ["createdAt", "updatedAt"]