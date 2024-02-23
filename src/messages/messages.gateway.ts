import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { MessagesService } from 'src/messages/messages.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DialogsGateway {
  constructor(private messagesService: MessagesService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: any): Promise<void> {
    await this.messagesService.createMessage(payload);
    this.server.emit('recMessage', payload);
  }

  //   afterInit(server: Server) {
  //     console.log(server);
  //   }

  //   handleDisconnect(client: Socket) {
  //     console.log(`Disconnected: ${client.id}`);
  //   }

  //   handleConnection(client: Socket, ...args: any[]) {
  //     console.log(`Connected ${client.id}`);
  //   }
}
