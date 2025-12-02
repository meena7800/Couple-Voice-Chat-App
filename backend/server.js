require('dotenv').config();
const express = require("express");
const http = require("http");
const socket = require("socket.io");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const server = http.createServer(app);
const io = socket(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

connectDB(process.env.MONGO_URI);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/rooms", require("./routes/rooms"));
app.use("/api/gifts", require("./routes/gifts"));
app.use("/api/wallet", require("./routes/wallet"));

app.set("io", io);

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("join_room", (data) => {
        socket.join("room_" + data.roomId);
    });

    socket.on("disconnect", () => {});
});

server.listen(process.env.PORT, () =>
    console.log("Server running on PORT", process.env.PORT)
);
