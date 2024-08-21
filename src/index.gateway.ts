import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
interface User {
  username: string;
  socketId: string;
}

interface JoinPayload {
  roomName: string;
  user: User;
}
interface Message {
  message: string;
  user: User;
  time: string;
  roomName: string;
}
@WebSocketGateway({
  cors: {origin: "*"},
})
export class IndexGateway {
  @WebSocketServer() server: Server;

  checkAuth(client: Socket) {
    console.log("AuthHandshake: ", client?.handshake?.auth);
    console.log("QueryHandshake: ", client?.handshake?.query);
    
  }
  @SubscribeMessage("join_room")
  async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinPayload
  ) {
    this.checkAuth(client);
    console.log(client.id, data);
    if (client.id && data?.roomName) {
      if (client.rooms.has(data.roomName)) {
        console.log(
          " Already joined in : " + data.roomName + " socketId: " + client.id
        );
      } else {
        client.join(data.roomName);
      }
    } else {
      client.emit("exception", "You're disconnected");
    }
  }
  @SubscribeMessage("server-chat")
  async serverChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: Message
  ) {
    //process (save message in db, validate rooms and user connected, authorization user)
    this.checkAuth(client);
    if (data.roomName) {
      return this.server.to(data.roomName).emit("client-chat", data);
    }
    return client.emit("exception", "room not found");
  }
}
