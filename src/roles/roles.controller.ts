import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Permissions } from '../auth/guards/permissions.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth,guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './entities/role.entity';

@Controller('roles')
@ApiTags('Roles')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Permissions('roles:create')
  async create(@Req() req, @Body() createRoleDto: CreateRoleDto) {
    const { user } = req;
    const result = await this.rolesService.create(createRoleDto);
    return result.json;
  }

  @Get()
  @ApiResponse({ status: 201, description: 'Get all records', type: [Role] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Permissions('roles:read')
  async findAll(@Req() req) {
    const { user } = req;
    const result = await this.rolesService.findAll();
    return result.map(it => it.json);
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: 'Get one records', type: Role })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Permissions('roles:read')
  async findOne(@Param('id') id: string) {
    const result = await this.rolesService.findOne(+id);
    return result.json;
  }

  @Patch(':id')
  @ApiResponse({ status: 201, description: 'The record has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Permissions('roles:update')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    await this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 201, description: 'The record has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Permissions('roles:delete')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
