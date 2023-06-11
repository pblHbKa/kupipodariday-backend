import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { instanceToPlain } from 'class-transformer';
import { SiqninUserDto } from './dto/signin-user.dto';

@Controller()
export class AuthController {
    constructor (
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    login(
        @AuthUser() user,
        @Body() signinUserDto: SiqninUserDto 
    ): Promise<any> {
        console.log(user);
        return this.authService.login(user);
    }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.signup(createUserDto);
        // return instanceToPlain(user);
        return user;
    }
}