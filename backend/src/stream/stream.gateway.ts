import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { v4 as uuid } from 'uuid';

type JoinRoomProps = {
  room: string,
  peer: string,
};

type RoomProps = {
  id: string,
  users: Array<string>,
};

type UserProps = {
  id: string,
  peer: string,
  room: string,
  name?: string,
};

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class StreamGateway implements OnGatewayDisconnect {
  rooms = new Map<string, RoomProps>();
  users = new Map<string, UserProps>();

  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {
    const user = this.getUser(client.id);

    if (user === undefined) return;

    const room = this.getRoom(user.room);

    if (room === undefined) return;

    room.users = room.users.filter((peer) => peer !== user.id);

    client.broadcast.emit('user-leaved', user);
    client.leave(room.id);

    this.server.sockets.in(room.id).emit('receive-message', {
      id: uuid(),
      message: `${user.id} leaved the room`,
    });

    if (room.users.length === 0)
      this.rooms.delete(room.id);

    this.users.delete(client.id);

    this.server.sockets.in(room.id).emit('update-participants', {
      id: uuid(),
      message: this.getUsersInRoom(room.id),
    });
  }

  @SubscribeMessage('join-room')
  joinRoom(client: Socket, data: JoinRoomProps) {
    const room = this.getRoom(data.room, client.id);
    const user = this.getUser(client.id, data);

    client.join(room.id);
    client.broadcast.emit('user-joined', user);

    this.server.sockets.in(room.id).emit('receive-message', {
      id: uuid(),
      message: `${user.id} joined the room`,
    });

    this.server.sockets.in(room.id).emit('update-participants', {
      id: uuid(),
      message: this.getUsersInRoom(room.id),
    });
  }

  @SubscribeMessage('send-message')
  sendMessage(client: Socket, data: string) {
    const sender = this.getUser(client.id);

    if (sender === undefined) return;

    const message = {
      id: uuid(),
      sender: sender.name ?? sender.id,
      message: data,
    };

    this.server.sockets.in(sender.room).emit('receive-message', message);
  }

  getRoom(roomId: string, clientId?: string): RoomProps {
    const room = this.rooms.get(roomId);

    if (room === undefined && clientId !== undefined) {
      this.rooms.set(roomId, {
        id: roomId,
        users: [clientId]
      });
    }

    return this.rooms.get(roomId);
  }

  getUser(clientId: string, data?: JoinRoomProps): UserProps {
    const user = this.users.get(clientId);

    if (user === undefined && data !== undefined) {
      this.users.set(clientId, {
        id: clientId,
        peer: data.peer,
        room: data.room,
      });
    }

    return this.users.get(clientId);
  }
  
  getUsersInRoom(roomId: string) {
    const list = [];

    this.users.forEach((user) => {
      if (user.room === roomId)
        list.push(user.id);
    });
    
    return list;
  }
}
