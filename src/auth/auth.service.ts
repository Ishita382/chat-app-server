import { Injectable } from '@nestjs/common';
import { AuthLeads } from './entities/auth-lead.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/sequelize';
import { LoginUserDto } from './dto/login.dto';
import { generateOtpAndtoken } from 'src/utils/helpers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthLeads)
    private authLeads: typeof AuthLeads,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const { token } = generateOtpAndtoken(
      {
        email: registerUserDto.email,
        name: registerUserDto.name,
      },
      this.jwtService,
    );
    const authLead = await this.authLeads.create({
      ...registerUserDto,
      token,
    });

    const user = await this.usersService.create(authLead);

    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const authLead = await this.usersService.findOne({
      email: loginUserDto.email,
    });

    return authLead;
  }
}
