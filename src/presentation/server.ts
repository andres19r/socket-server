import express, { Router } from "express";
import { Server } from "socket.io";
import { createServer } from "http";

interface Options {
  port: number;
  routes: Router;
}

export class SocketServer {
  public app = express();
  private readonly port: number;
  private readonly routes: Router;
  private readonly server = createServer(this.app);
  public readonly io = new Server(this.server, { cors: { origin: "*" } });

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.io.on("connection", (socket) => {
      const idHandshake = socket.id;
      console.log(`Client connected ${idHandshake}`);

      socket.on("message", (socket) => {
        console.log(socket);
      });

      socket.on("chat", (data) => {
        this.io.emit("server", data);
      });
    });

    // Routes
    this.app.use(this.routes);

    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
