import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { Repository } from 'sequelize-typescript';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { SigninDto } from 'src/config/dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signupDto: CreateUserDto): Promise<User> {
    const { roles } = signupDto;
    const exist = await this.userService.findOne({
      [Op.or]: [{ email: signupDto.email }, { name: signupDto.name }],
    });

    if (exist) {
      const err =
        exist.email === signupDto.email
          ? 'email already exist'
          : 'userName already exist';
      throw new ConflictException(err);
    }

    //Hash password
    const hash = await this.hashString(signupDto.password);

    const res = await this.userService.create({
      ...signupDto,
      password: hash,
    });
    return res;
  }

  async signIn(signinDto: SigninDto) {
    const { userName, password } = signinDto;

    //Finding user
    const found = await this.userService.findOne({
      name: userName,
    });
    if (!found) {
      throw new NotFoundException('Invalid Credentials');
    }

    //Matching user password
    await this.checkPassword(password, found.password);
    const token = await this.getTokens(found);
    return {
      token: token,
    };
  }

  async validateUser(signInDto: SigninDto) {
    const user = await this.signIn(signInDto);
    if (user) {
      return user;
    }
    return null;
  }

  async getTokens(user: User) {
    const found = await this.userService.findOne({
      name: user.name,
    });
    if (!found) {
      throw new NotFoundException('Invalid Credentials !');
    }
    const payload = {
      id: found.id,
      name: found.name,
      email: found.email,
      roles: found.roles,
    };
    const [accessTokens] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: 'secret',
        expiresIn: '1d',
      }),
    ]);
    return accessTokens;
  }

  async checkPassword(password: string, actualPassword: string): Promise<void> {
    const isMatch = await bcrypt.compare(password, actualPassword);

    if (!isMatch) {
      throw new NotFoundException('invalid credentials');
    }
  }

  async hashString(data: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(data, salt);
  }
}
