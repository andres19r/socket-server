import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { SocketServer } from "./presentation/server";

(async () => {
  main();
})();

function main() {
  const server = new SocketServer({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}
