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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { newPasswordDataDto } from './dto/new-password-data.dto';
import { User } from './entities/user.entity';
import { UpdateUserSettingsDto } from './dto/update-settings-profile.dto';
import { SetTicketsFilterDto } from './dto/set-tickets-filter.dto';

@Controller('users')
@ApiTags('Users')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Permissions('users:create')
  async create(@Request() req, @Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(req.user, createUserDto);
    return user.json;
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all records', type: [User] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Permissions('users:read')
  async findAll(@Request() req) {
    try {
      const users = await this.usersService.findAll();
      return users.map(it => it.json);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/me')
  @ApiResponse({ status: 200, description: 'Get one record', type: User })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  getOwnData(@Request() req) {
    return req.user.json;
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get one records', type: User })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Permissions('users:read')
  async findOne(@Param('id') id: string) {
    const users = await this.usersService.findOne(+id);
    return users.json;
  }

  @Patch('me/profile')
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  updateProfile(@Request() req, @Body() params: UpdateUserProfileDto) {
    return this.usersService.updateProfile(req.user.id, params);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Permissions('users:update')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch(':id/changePassword')
  @ApiResponse({ status: 200, description: 'The password has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Permissions('users:update')
  changePassword(@Param('id') id: string, @Body() newPasswordData: newPasswordDataDto) {
    return this.usersService.changePassword(+id, newPasswordData);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The record has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Permissions('users:delete')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Patch('me/settings')
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  updateTableSettings(@Request() req, @Body() params: UpdateUserSettingsDto) {
    return this.usersService.updateTableSettings(req.user.id, params);
  }

  @Patch('me/ticketfilters')
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  updateTicketFilters(@Request() req, @Body() params: SetTicketsFilterDto) {
    return this.usersService.updateTicketFilters(req.user.id, params);
  }
}
