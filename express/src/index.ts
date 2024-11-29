import express, { Response, Request } from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server has started on: http://localhost:${PORT}`);
});

app.get("/", (_: Request, res: Response) => {
  res.send("Zacznijmy uzywac ts na tej uczelni pls");
});
