import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

@Schema({
    timestamps : true
}) 

export class User extends Document {

    // @Prop()
    // name: string

    @Prop({unique: [true, 'Duplicate email is entered ']})
    email: string


    @Prop({ required: true })
    password : string

    @Prop({required: true})
    phoneNumber: string
    
    @Prop({ default: Date.now })
    createdAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)