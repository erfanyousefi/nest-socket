import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import {Server} from "socket.io";

@WebSocketGateway({cors: {origin: "*"}, namespace: "channel"})
export class ChannelGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage("list")
  getList(client: any, data: any) {
    console.log(data);
    client.emit("list", [
      {name: "channel-1"},
      {name: "channel-2"},
      {name: "channel-3"},
    ]);
  }
}
