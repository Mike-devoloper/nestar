import { Module } from '@nestjs/common';
import {InjectConnection, MongooseModule} from "@nestjs/mongoose"
import {Connection} from "mongoose"
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: () => ({ uri: process.env.NODE_DEV === "production" ? process.env.MONGO_PROD : process.env.MONGO_DEV})
        })
    ],
    exports: [MongooseModule]
})
export class DatabaseModule {
    constructor(@InjectConnection() private readonly connection: Connection){
        if(connection.readyState === 1) {
            console.log("MOngo Db has connected successfully" + process.env.NODE_ENV === "production" ? "production" : "development")
        } else {
            console.log("Mongo DB is not connected")
        }
    }
}