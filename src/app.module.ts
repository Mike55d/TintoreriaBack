import path, { join } from 'path';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { CommentTicket } from './tickets/entities/comment-ticket.entity';
import { AssetsModule } from './assets/assets.module';
import { AssetTypes } from './assets/entities/asset.entity';
import { AssetFields } from './assets/entities/asset-fields.entity';
import { ClientAssetModule } from './client-asset/client-asset.module';
import { ClientAsset } from './client-asset/entities/client-asset.entity';
import { LogsMiddleware } from './logs.middleware';
import { HistoricModule } from './historic/historic.module';
import { Historic } from './historic/entities/historic.entity';
import { Category } from './categories/entities/category.entity';
import { AlertTitle } from './categories/entities/alert-title.entity';
import { CategoriesModule } from './categories/categories.module';
import { FileE } from './tickets/entities/files.entity';
import { SettingsModule } from './settings/settings.module';
import { Setting } from './settings/entities/setting.entity';
import { EmailSetting } from './email/entities/email-notification.entity';
import { EmailModule } from './email/email.module';
import { ImportExcelModule } from './import-excel/import-excel.module';
import { TicketGlpi } from './tickets/entities/ticket-glpi.entity';
import { NotifcationsTitleAlertModule } from './notifcations-title-alert/notifcations-title-alert.module';
import { NotifcationsTitleAlert } from './notifcations-title-alert/entities/notifcations-title-alert.entity';
import { DistributionList } from './distribution-lists/entities/distributionList.entity';
import { DistributionListsModule } from './distribution-lists/distribution-lists.module';
import { ExternalApplication } from './external-application/entities/external-application.entity';
import { ExternalApplicationModule } from './external-application/external-application.module';
import { NotificationsModule } from './notifications/notifications.module';
import { Notification } from './notifications/entities/notification.entity';
import { LogsForwardingModule } from './logs-forwarding/logs-forwarding.module';
import { LogsForwarding } from './logs-forwarding/entities/logs-forwarding.entity';
import { AtentionTimeModule } from './atention-time/atention-time.module';
import { AtentionTime } from './atention-time/entities/atention-time.entity';

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
        CommentTicket,
        AssetTypes,
        AssetFields,
        ClientAsset,
        Historic,
        Category,
        AlertTitle,
        FileE,
        Setting,
        EmailSetting,
        NotifcationsTitleAlert,
        DistributionList,
        ExternalApplication,
        Notification,
        LogsForwarding,
        AtentionTime
      ]
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
      retryAttempts: +process.env.GLPI_RETRY_ATTEMPTS,
      entities: [TicketGlpi]
    } as TypeOrmModuleOptions),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'organization_logos')
    }),
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
    EmailModule,
    TicketsModule,
    AssetsModule,
    ClientAssetModule,
    HistoricModule,
    CategoriesModule,
    SettingsModule,
    EmailModule,
    ImportExcelModule,
    NotifcationsTitleAlertModule,
    ImportExcelModule,
    DistributionListsModule,
    ExternalApplicationModule,
    NotificationsModule,
    LogsForwardingModule,
    AtentionTimeModule
  ],
  providers: [ApiConfigService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
