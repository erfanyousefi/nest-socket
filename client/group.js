const group = io("http://localhost:3000/group");
group.on("connect", () => {
    group.emit("list", {message: "Send group list"});
    group.on("list", data => {
        console.log("Group List: ", data);
    });
});