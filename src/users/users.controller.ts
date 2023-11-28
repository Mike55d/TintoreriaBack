import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth,guard';
import { Permissions } from '../auth/guards/permissions.decorator';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { ApiTags } from '@nestjs/swagger';
import { newPasswordDataDto } from './dto/new-password-data.dto';

@Controller('users')
@ApiTags('Users')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Request() req, @Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(req.user, createUserDto);
    return user.json;
  }

  @Get()
  @Permissions('users:read')
  async findAll(@Request() req) {
    try {
      const users = await this.usersService.findAll(req.user.org);
      return users.map(it => it.json);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('all/users')
  @Permissions('users:read')
  async findAllUsers(@Request() req) {
    try {
      const users = await this.usersService.findAllUsers();
      return users.map(it => it.json);
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id/findByOrg')
  @Permissions('users:read')
  async findAllByOrg(@Param('id') id: string) {
    const users = await this.usersService.findAllByOrg(+id);
    return users.map(it => it.json);
  }

  @Get('/public')
  async findAllPublic(@Request() req) {
    const users = await this.usersService.findAll(req.user.org);
    return users.map(it => it.registrarInfo);
  }

  @Get('/me')
  getOwnData(@Request() req) {
    try {
      return req.user.json;
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const users = await this.usersService.findOne(+id);
    return users.json;
  }

  @Patch('me/profile')
  updateProfile(@Request() req, @Body() params: UpdateUserProfileDto) {
    return this.usersService.updateProfile(req.user.id, params);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch(':id/changePassword')
  changePassword(@Param('id') id: string, @Body() newPasswordData: newPasswordDataDto) {
    return this.usersService.changePassword(+id, newPasswordData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
