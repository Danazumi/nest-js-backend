import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bycript from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    //create construtor & inject model
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService 
    ) {}


    async signUp(signUpDto : SignUpDto): Promise<{token : string}>{
        const {email, password, phoneNumber} = signUpDto

        //if the user already exists
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
          throw new UnauthorizedException('Email already registered');
        }

        const hashedPassword = await bycript.hash(password, 10)
        
        const user  =  await this.userModel.create({
            email,
            password: hashedPassword,
            phoneNumber,      
            createdAt : new Date()
        })

        //assign jwt token to the user
        //payload is the data that we want to save in the token
        const token =  this.jwtService.sign({id: user._id})

        return {token}

    }

    async login(loginDto : LoginDto) : Promise<{token : string}>{
        const {email , password} = loginDto

        //if the user exists with this email or not
        const user = await this.userModel.findOne({email})

        if(!user) {
            throw new UnauthorizedException("Invalid email or password")
        }
        //If the user exists with that email then validate the password
        const isPasswordMatched = await bycript.compare(password, user.password)

        if(!isPasswordMatched) {
            throw new UnauthorizedException("Invalid email or password")
        }

        //If email & password are correct get token
        const token =  this.jwtService.sign({id: user._id})

        return {token} 
         
    }

    async getAllUsers() {
        return this.userModel.find({}, { email: 1, createdAt: 1 }).sort({ createdAt: -1 });
      }
}




//Here we create routes for login and signUp