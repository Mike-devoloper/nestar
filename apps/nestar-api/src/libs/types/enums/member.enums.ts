import {registerEnumType} from "@nestjs/graphql"

export enum MemberType {
    USER = 'USER',
    AGENT = 'AGENT',
    ADMIN = 'ADMIN'
} 
registerEnumType(MemberType, {name: "MemberType"})

export enum MemberStatus {
    ACTIVE = 'ACTIVE',
    BLOCK = 'BLOCK',
    DELETE = 'DELETE'
} 
registerEnumType(MemberStatus, {name: "MemberStatus"})

export enum MemberAuth {
    TELEGRAM = 'TELEGRAM',
    PHONE = 'PHONE',
    EMAIL = 'EMAIL'
}
registerEnumType(MemberAuth, {name: "MemberAuth"})