import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterUserDto } from './dto/signup-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('权限认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @Post('login')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
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
