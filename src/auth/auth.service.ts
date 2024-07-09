import { Injectable } from '@nestjs/common';
import { AuthLeads } from './entities/auth-lead.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/sequelize';
import { LoginUserDto } from './dto/login.dto';
import { generateJwt } from 'src/utils/helpers';
import { JwtService } from '@nestjs/jwt';
import { Unauthorized } from 'src/utils/exceptions';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthLeads)
    private authLeads: typeof AuthLeads,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const authLead = await this.authLeads.create({
      ...registerUserDto,
    });

    const user = await this.usersService.create(authLead);

    await authLead.destroy();

    return {
      user,
      ...(await generateJwt({ id: user.id, name: user.name }, this.jwtService)),
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const authLead = await this.usersService.findOne({
      email: loginUserDto.email,
    });

    if (!authLead) {
      throw new Unauthorized();
    }

    return {
      authLead,
      ...(await generateJwt(
        { id: authLead.id, name: authLead.name },
        this.jwtService,
      )),
    };
  }
}
