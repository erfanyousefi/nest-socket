const channel = io("http://localhost:3000/channel");
channel.on("connect", () => {
    console.log("Connected");
    channel.emit("list", {message: "send channel list"});
    channel.on("list", data => {
        console.log("Channel List: ", data);
    });
});