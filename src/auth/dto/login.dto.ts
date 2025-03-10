import { IsNotEmpty, IsEmail, IsString, MinLength } from "@nestjs/class-validator"
export class  LoginDto {

    @IsNotEmpty()
    @IsEmail({}, {message: "Please enter valid email" })
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string

}