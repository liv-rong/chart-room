import { PartialType } from '@nestjs/mapped-types';
import { LoginUserDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(LoginUserDto) {}
