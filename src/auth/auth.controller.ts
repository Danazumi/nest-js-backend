import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService ){}

    @Post('/signup')
    signup(@Body() signUpDto: SignUpDto): Promise<{token : string}>{
        return this.authService.signUp(signUpDto)
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto): Promise<{token : string}>{
        return this.authService.login(loginDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req){

        return {email: req.user.email}
    }
    
}


 