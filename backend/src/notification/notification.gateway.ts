/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // update in prod
  },
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  // Send event to all clients
  broadcast(event: string, data: any) {
    this.server.emit(event, data);
  }

  // Optional: handle incoming client events
  @SubscribeMessage('ping')
  handlePing(@MessageBody() data: any): string {
    return 'pong';
  }
}
