import path, { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/role.entity';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';
import { AuthModule } from './auth/auth.module';
import { Session } from './sessions/entities/session.entity';
import { User } from './users/entities/user.entity';
import { UserProfile } from './users/entities/user-profile.entity';
import { ApiConfigService } from './api-config/api-config.service';
import { ApiConfigModule } from './api-config/api-config.module';
import { LogsModule } from './logs/logs.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { WebsocketModule } from './websocket/websocket.module';
import { DbNamingStrategy } from './db-naming.strategy';
import { Log } from './logs/entities/logs.entity';
import { ErrorsModule } from './errors/errors.module';
import { I18nModule } from 'nestjs-i18n';
import { ScheduleModule } from '@nestjs/schedule';
import { PreSession } from './sessions/entities/pre-session.entity';
import { UsersToRoles } from './users/entities/usersToRoles.entity';
import { TicketsModule } from './tickets/tickets.module';
import { Impact } from './tickets/entities/impact.entity';
import { Priority } from './tickets/entities/priority.entity';
import { Status } from './tickets/entities/status.entity';
import { Ticket } from './tickets/entities/ticket.entity';
import { Type } from './tickets/entities/type.entity';
import { Urgency } from './tickets/entities/urgency.entity';
import { ClientsModule } from './clients/clients.module';
import { Client } from './clients/entities/clients.entity';
import { AssignUser } from './tickets/entities/assign-users.entity';
@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'es',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      exclude: ['/api*']
    }),
    TypeOrmModule.forRoot({
      namingStrategy: DbNamingStrategy.strategy,
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: +process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      logging: process.env.TYPEORM_LOGGING,
      retryAttempts: +process.env.TYPEORM_RETRY_ATTEMPTS,
      entities: [
        Role,
        Session,
        User,
        UserProfile,
        Log,
        PreSession,
        UsersToRoles,
        Impact,
        Priority,
        Status,
        Ticket,
        Type,
        Urgency,
        AssignUser,
        Client,
      ]
    } as TypeOrmModuleOptions),
    LogsModule,
    RolesModule,
    UsersModule,
    ClientsModule,
    AuthModule,
    SessionsModule,
    ConfigModule,
    ApiConfigModule,
    LogsModule,
    WebsocketModule,
    ErrorsModule,
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'organization_logos')
    }),
    TicketsModule
  ],
  providers: [ApiConfigService]
})
export class AppModule {}
