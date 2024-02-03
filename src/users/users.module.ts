import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ApiConfigModule } from '../api-config/api-config.module';
import { MulterModule } from '@nestjs/platform-express';
import { ApiConfigService } from '../api-config/api-config.service';
import { UserProfile } from './entities/user-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,UserProfile]),
    ApiConfigModule,
    MulterModule.registerAsync({
      imports: [ApiConfigModule],
      useFactory: async (config: ApiConfigService) => config.getMulterOptions(),
      inject: [ApiConfigService]
    })
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
