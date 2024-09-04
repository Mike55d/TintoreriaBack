import path, { join } from 'path';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
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
import { UsersToRoles } from './users/entities/usersToRoles.entity';
import { LogsMiddleware } from './logs.middleware';
import { EmailSetting } from './email/entities/email-notification.entity';
import { EmailModule } from './email/email.module';
import { Role } from './roles/entities/role.entity';
import { Session } from './sessions/entities/session.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
      entities: [User, UserProfile, Log, UsersToRoles, EmailSetting, Role,Session]
    } as TypeOrmModuleOptions),
    TypeOrmModule.forRoot({
      name: 'glpi',
      namingStrategy: DbNamingStrategy.strategy,
      type: process.env.GLPI_CONNECTION,
      host: process.env.GLPI_HOST,
      port: +process.env.GLPI_PORT,
      username: process.env.GLPI_USERNAME,
      password: process.env.GLPI_PASSWORD,
      database: process.env.GLPI_DATABASE,
      synchronize: process.env.GLPI_SYNCHRONIZE === 'true',
      logging: process.env.GLPI_LOGGING,
      retryAttempts: +process.env.GLPI_RETRY_ATTEMPTS
    } as TypeOrmModuleOptions),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'organization_logos')
    }),
    LogsModule,
    UsersModule,
    AuthModule,
    ConfigModule,
    ApiConfigModule,
    LogsModule,
    WebsocketModule,
    ErrorsModule,
    EmailModule,
    EmailModule
  ],
  providers: [ApiConfigService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
