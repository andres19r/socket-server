import { Router } from "express";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // router.use("/api/todos", Api.routes);

    return router;
  }
}
