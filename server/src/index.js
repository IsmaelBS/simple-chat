import express from "express";
import http from "http";
import sockeio from "socket.io";
const connectUsers = {};

const app = express();
const server = http.createServer(app);

const io = sockeio(server);

io.on("connection", socket => {
  const { id: socketId } = socket;

  socket.nickname = socketId;
  connectUsers[socketId] = socket;

  socket.on("nickname", nickname => {
    connectUsers[socketId].nickname = nickname;
  });

  socket.on("typing", data => {
    socket.broadcast.emit("someoneIsTyping", connectUsers[socketId].nickname);
  });

  socket.broadcast.emit("newConnection", {
    user: connectUsers[socketId].nickname
  });

  socket.on("enviar", response => {
    socket.broadcast.emit("receber", {
      type: "recebido",
      message: response.message,
      user: connectUsers[socketId].nickname
    });
  });

  socket.on("disconnecting", reason => {
    console.log(`Usuário ${socketId} desconectado`);
    delete connectUsers[socketId];
  });
});

server.listen(3333);
