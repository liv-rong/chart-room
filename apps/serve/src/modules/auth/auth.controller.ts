import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterUserDto } from './dto/signup-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

@ApiTags('权限认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @ApiOperation({ summary: '登录' })
  @Post('login')
  async userLogin(@Body() loginUser: LoginUserDto) {
    const user = await this.authService.login(loginUser);

    return {
      user,
      token: this.jwtService.sign(
        {
          userId: user.id,
          username: user.username,
        },
        {
          expiresIn: '7d', //过期时间7day
        },
      ),
    };
  }
  @ApiOperation({ summary: '注册' })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '成功',
    type: String,
  })
  @Post('signup')
  async register(@Body() registerUser: RegisterUserDto) {
    return await this.authService.create(registerUser);
  }

  @ApiOperation({ summary: '刷新token' })
  @Post('refresh')
  async refresh(@Body() refreshToken: string) {
    return;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
