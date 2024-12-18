import {ObjectId} from "bson"


// IMAGE CONFIGURATION (config.js)
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

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

export const availableArticleSorts = ["createdAt", "updatedAt", "articleLikes", "articleViews"];

export const lookupMember = {
    $lookup: {
        from: "members",
        localField: 'memberId',
        foreignField: '_id',
        as: 'memberData'
    }
}

export const availableCommentSorts = ["createdAt", "updatedAt"]