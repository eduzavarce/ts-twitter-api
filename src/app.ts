import express from "express";
import morgan from "morgan";
import path from "path";

import { errorHandler } from "./middlewares/error/errorHandler";
import { notFoundHandler } from "./middlewares/error/notFoundHandler";
import { statusRouter } from "./status/statusRouter";
import { usersRouter } from "./users/router/usersRouter";

const app = express();

app.set("port", process.env.PORT ?? 3000);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }));

app.use("/api/v1/status", statusRouter);
app.use("/api/v1/users", usersRouter);

app.use(errorHandler);
app.use(notFoundHandler);

export default app;
