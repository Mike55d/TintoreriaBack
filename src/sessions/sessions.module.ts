import { forwardRef, Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { PreSession } from './entities/pre-session.entity';
import { User } from '../users/entities/user.entity';
import { HttpModule } from '@nestjs/axios';
import { UsersToRoles } from '../users/entities/usersToRoles.entity';
import { Role } from '../roles/entities/role.entity';
import { Priority } from '../tickets/entities/priority.entity';
import { Type } from '../tickets/entities/type.entity';
import { Impact } from '../tickets/entities/impact.entity';
import { Urgency } from '../tickets/entities/urgency.entity';
import { Status } from '../tickets/entities/status.entity';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    UsersModule,
    TypeOrmModule.forFeature([
      Session,
      PreSession,
      User,
      Session,
      UsersToRoles,
      Role,
      Priority,
      Type,
      Impact,
      Urgency,
      Status
    ]),
    HttpModule
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService]
})
export class SessionsModule {}
