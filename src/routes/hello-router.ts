import * as express from "express";

const router: express.Router = express.Router();

class HelloResponse {
  public message: string;

  constructor(message: string) {
    this.message = message;
  }
}

router.get("/hello", (req: express.Request, res: express.Response) => {
  res.send(new HelloResponse("Hello, World!!!!!"));
});

export default router;
