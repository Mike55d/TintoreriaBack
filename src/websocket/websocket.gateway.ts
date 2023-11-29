import { OnGatewayConnection, OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { SessionsService } from '../sessions/sessions.service';
import { User } from '../users/entities/user.entity';

type SessionType = 'appSession' | 'standard' | 'all';
interface CustomSocket extends Socket {
  appClient: {
    uuid: string;
    user: User | null;
  };
}

interface GlobalListener {
  event: string;
  listener: (...args: any[]) => void;
  sessionType: SessionType;
}

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayInit {
  private socketServer: SocketIOServer;
  private globalListeners: GlobalListener[] = [];

  constructor(private readonly sessionsService: SessionsService) {}

  async afterInit(server: SocketIOServer) {
    this.socketServer = server;
  }

  async handleConnection(socket: CustomSocket) {
    try {
      const sessionType: SessionType = socket.handshake.auth.sessionType;
      const token: string = socket.handshake.auth.token;
      const session = await this.sessionsService.getSessionFromToken(token);
      const globalListeners = this.globalListeners.filter(
        x => x.sessionType === sessionType || x.sessionType === 'all'
      );

      for (const x of globalListeners) {
        socket.on(x.event, x.listener);
      }

      socket.appClient = {
        uuid: session.deviceId,
        user: session.user
      };

      socket.join(`device-${session.deviceId}`);
      socket.join(`user-${session.user.id}`);
    } catch (e) {
      socket.disconnect();
    }
  }

  addGlobalListener(sessionType: SessionType, event: string, listener: (...args: any[]) => void) {
    this.globalListeners.push({ event, listener, sessionType });
  }

  sendToDevice(deviceId: string, event: string, message: any) {
    this.socketServer.to(`device-${deviceId}`).emit(event, message);
  }

  sendToUser(user: User, event: string, message: any) {
    this.socketServer.to(`user-${user.id}`).emit(event, message);
  }

}
