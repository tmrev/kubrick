import { Request, Response } from "express";

const healthController = async (req: Request, res: Response) => {
  try {
    res.send("ok");
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default healthController;
