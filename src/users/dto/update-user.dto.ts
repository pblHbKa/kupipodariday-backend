import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsUrl } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsNotEmpty()
    username: string;
    
    about: string;

    @IsUrl()
    avatar: string;

    @IsEmail()
    email: string;

    password: string;

    id: number;
}
