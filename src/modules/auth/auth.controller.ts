import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DefaultException } from 'src/config/exceptions/default.exception';
import { SigninDto } from 'src/config/dto/signin.dto';

@ApiResponse({ status: 400, type: () => DefaultException })
@ApiBearerAuth('access-token')
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'This endpoint will creaate a new user',
  })
  @Post('signup')
  async signUp(@Body() signUpDto: CreateUserDto): Promise<User> {
    const res = await this.authService.signUp(signUpDto);
    const { password, ...userData } = res.dataValues;
    return new User(userData);
  }

  @ApiOperation({
    description: 'This endpoint is for Signin',
  })
  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    return await this.authService.signIn(signinDto);
  }
}
