import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import {Server} from "socket.io";

@WebSocketGateway({cors: {origin: "*"}, namespace: "group"})
export class GroupGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage("list")
  getList(client: any, data: any) {
    console.log(data);
    client.emit("list", [
      {name: "group-1"},
      {name: "group-2"},
      {name: "group-3"},
    ]);
  }
}
