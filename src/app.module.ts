import {Module} from "@nestjs/common";
// import {ChatGateway} from "./chat/chat.gateway";
import {GroupGateway} from "./group/group.gateway";
import {ChannelGateway} from "./channel/channel.gateway";
import {IndexGateway} from "./index.gateway";

@Module({
  imports: [],
  controllers: [],
  providers: [IndexGateway, GroupGateway, ChannelGateway],
})
export class AppModule {}
