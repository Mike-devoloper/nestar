import {ObjectId} from "bson"

export const availableAgentSort = ["createdAt", "updatedAt", "memberRank", "memberLikes", "memberViews"]
export const shapeIntoMongoDbObjectId = (target: any) => {
return typeof target === "string" ? new ObjectId(target) : target;
}