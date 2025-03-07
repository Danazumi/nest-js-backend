import { IsNotEmpty, IsEmail, IsString, MinLength, isNotEmpty } from "@nestjs/class-validator"
export class  SignUpDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    @IsEmail({}, {message: "Please enter valid email" })
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string
    
    @IsNotEmpty()
    @IsString()
    phoneNumber : string       //phone no field added

}