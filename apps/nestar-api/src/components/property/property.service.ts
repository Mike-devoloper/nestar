import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model, ObjectId } from 'mongoose';
import { Property } from '../../libs/dto/property/property';
import { PropertyInput } from '../../libs/dto/property/property.input';
import { PropertyUpdate } from '../../libs/dto/property/property.update';
import { StatisticModifier, T } from '../../libs/types/common';
import { Message } from '../../libs/types/enums/common.enum';
import { PropertyStatus } from '../../libs/types/enums/property.enum';
import { ViewGroup } from '../../libs/types/enums/view.enum';
import { MemberService } from '../member/member.service';
import { ViewService } from '../view/view.service';

@Injectable()
export class PropertyService {
    constructor(@InjectModel('Property') 
    private readonly propertyModel: Model<Property>, private memberService: MemberService, private viewService: ViewService) {}

    public async createProperty(input: PropertyInput):Promise<Property>{
        try{
            const result = await this.propertyModel.create(input)

        await this.memberService.memberStatsEditor({_id: result.memberId, targetKey: 'memberProperties', modifier: 1})
        return result;
        } catch(err) {
            console.log("error ", err);
            throw new BadRequestException(Message.CREATE_FAILED)
        }
    }

    public async getProperty(memberId:ObjectId, propertyId:ObjectId):Promise<Property> {
        const search: T = {
            _id: propertyId,
            propertyStatus: PropertyStatus.ACTIVE 
        }

        const targetProperty = await this.propertyModel.findOne(search).exec();
        if(!targetProperty) throw new BadRequestException(Message.NO_DATA_FOUND);

        if(memberId) {
            const viewInput = {memberId: memberId, viewRefId: propertyId, viewGroup: ViewGroup.PROPERTY}
            const newView = await this.viewService.recordView(viewInput);

            if(newView) {
               const updatedProperty =  await this.propertyStatsEditor({_id: propertyId, targetKey: "propertyViews", modifier: 1})
                targetProperty.propertyViews = updatedProperty.propertyViews;
            }
        }

        targetProperty.memberData = await this.memberService.getMember(null, targetProperty.memberId)
        return targetProperty;
    }

    public async updateProperty(memberId: ObjectId, input: PropertyUpdate):Promise<Property> {
        let {propertyStatus, soldAt, deletedAt} = input;

        const search: T = {
            _id: input._id,
            memberId: memberId,
            propertyStatus: PropertyStatus.ACTIVE
        }

        if(propertyStatus === PropertyStatus.SOLD) soldAt = moment().toDate();
        else if(propertyStatus === PropertyStatus.DELETE) deletedAt = moment().toDate();

        const result = await this.propertyModel.findOneAndUpdate(search, input, {new: true}).exec()

        if(!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

        if(soldAt || deletedAt) {
            await this.memberService.memberStatsEditor({
                _id: memberId,
                targetKey: "memberProperties",
                modifier: -1
            })
        }
        return result;
    }

    public async propertyStatsEditor(input: StatisticModifier):Promise<Property>{
        const {_id, targetKey, modifier} = input;
        return await this.propertyModel.findByIdAndUpdate(_id, {$inc: {[targetKey]: modifier}}, {new: true}).exec()
    }
}
