const express = require("express");
const app = express();
const socketIo = require("socket.io");
const server = require("http").createServer(app);
const io = socketIo(server);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  console.log("🟢 User is Connected.");

  socket.on("chat message", (msg) => {
    console.log(msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User is Disconnected.");
  });

  // Typing Message Display Logic
  socket.on("typing", () => {
    socket.broadcast.emit("typing", socket.id);
  });

  socket.on("stopTyping", () => {
    socket.broadcast.emit("stopTyping");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
