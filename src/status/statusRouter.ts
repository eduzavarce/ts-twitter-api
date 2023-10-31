import express from "express";

export const statusRouter = express.Router();

statusRouter.get("/", (req, res) => {
	return res.status(200).send();
});
