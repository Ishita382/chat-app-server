import { Injectable } from '@nestjs/common';
import { AuthLeads } from './entities/auth-lead.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/sequelize';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthLeads)
    private authLeads: typeof AuthLeads,
    private usersService: UsersService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const authLead = await this.authLeads.create({
      ...registerUserDto,
    });

    console.log(authLead, 'auth lead here');

    const user = await this.usersService.create(authLead);

    console.log(user, 'user user');

    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const authLead = await this.usersService.findOne({
      email: loginUserDto.email,
    });

    console.log(authLead, 'auth lead');

    return authLead;
  }
}
