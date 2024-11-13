import express, { Request, Response } from "express";
import dotenv from "dotenv";
import Joi from "joi";

const router: express.Router = express.Router();
dotenv.config();

export const fruits = [
  { id: 1, name: "Omena" },
  { id: 2, name: "Banaani" },
  { id: 3, name: "Mango" },
  { id: 4, name: "Appelsiini" },
  { id: 5, name: "Päärynä" },
];

router.get("/fruits", (req: Request, res: Response) => {
  const schema = Joi.object().unknown(false);
  const { error } = schema.validate(req.query);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    res.json(fruits);
  }
});

router.get("/fruit/:id", (req: Request, res: Response) => {
  const querySchema = Joi.object({
    id: Joi.number().required().min(1).max(9999),
  }).unknown(false);
  const { value, error } = querySchema.validate(req.params);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    if (!fruits.find((fruit) => fruit.id === Number(value.id))) {
      res.status(404).json({ id: -1, name: "" });
    } else {
      res.json(fruits.find((fruit) => fruit.id === Number(value.id)));
    }
  }
});

export default router;
