import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Permissions } from '../auth/guards/permissions.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth,guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('roles')
@ApiTags('Roles')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Permissions('roles:create')
  async create(@Req() req, @Body() createRoleDto: CreateRoleDto) {
    const { user } = req;
    const result = await this.rolesService.create(createRoleDto);
    return result.json;
  }

  @Get()
  @Permissions('roles:read')
  async findAll(@Req() req) {
    const { user } = req;
    const result = await this.rolesService.findAll();
    return result.map(it => it.json);
  }

  // @Get('findBy/org/:id')
  // @Permissions('roles:read')
  // async findAllByOrg(@Param('id') id: string) {
  //   const result = await this.rolesService.findAllByOrg(+id);
  //   return result.map(it => it.json);
  // }

  @Get(':id')
  @Permissions('roles:read')
  async findOne(@Param('id') id: string) {
    const result = await this.rolesService.findOne(+id);
    return result.json;
  }

  @Patch(':id')
  @Permissions('roles:update')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    await this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @Permissions('roles:delete')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
