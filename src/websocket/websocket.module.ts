import { Module } from '@nestjs/common';
import { SessionsModule } from '../sessions/sessions.module';
import { AppGateway } from './websocket.gateway';

@Module({
  imports: [SessionsModule],
  providers: [AppGateway],
  exports: [AppGateway]
})
export class WebsocketModule {}
