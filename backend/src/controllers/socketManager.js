import { Server } from "socket.io";
let connections = {};
let messages = {};
let timeOnline = {};
export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    console.log("something connected")
    socket.on("join-call", (path) => {
      if (connections[path] == undefined) {
        connections[path] = [];
      }
      connections[path].push(socket.id);
      timeOnline[socket.id] = new Date();

      for (let a = 0; a < connections[path].length; a++) {
        io.to(connections[path][a]).emit(
          "user-joined",
          socket.id,
          connections[path]
        );
      }
      if (messages[path] != undefined) {
        for (let a = 0; a < messages[path].length; ++a) {
          io.to(socket.id).emit(
            "chat-message",
            messages[path][a]["data"],
            messages[path][a]["sender"],
            messages[path][a]["socket-id-sender"]
          );
        }
      }
    });
    socket.on("signal", (toID, message) => {
      io.to(toID).emit("signal", socket.id, message);
    });
    socket.on("chat-message", (data, sender) => {
      const [matchingRoom, Found] = Object.entries(connections).reduce(
        ([room, isFound], [roomKey, roomValue]) => {
          if (!isFound && roomValue.includes(socket.id)) {
            return [roomKey, true];
          }
          return [room, isFound];
        },
        ["", false]
      );
      if (messages[matchingRoom] == undefined) {
        messages[matchingRoom] = [];
      }
      messages[matchingRoom].push({
        data: data,
        sender: sender,
        "socket-id-sender": socket.id,
      });
      console.log("messages:",matchingRoom, sender, data);
      connections[matchingRoom].forEach((id) => {
        io.to(id).emit("chat-message", data, sender, socket.id);
      });
    });
    socket.on("disconnect", () => {
      let diffTime = Math.abs(timeOnline[socket.id] - new Date());
      let key;
      for (const [k, v] of JSON.parse(
        JSON.stringify(Object.entries(connections))
      )) {
        for (let a = 0; a < v.length; ++a) {
          if (v[a] === socket.id) {
            key = k;
            for (let a = 0; a < connections[key].length; ++a) {
              io.to(connections[key][a]).emit("user-left", socket.id);
            }
            let index = connections[key].indexOf(socket.id);
            connections[key].splice(index, 1);
            if (connections[key].length === 0) {
              delete connections[key];
            }
          }
        }
      }
    });
  });
  return io;
};
