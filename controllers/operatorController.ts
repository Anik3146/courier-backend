import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Operator } from "../entities/Operator";

const operatorRepo = AppDataSource.getRepository(Operator);

export const getAllOperators = async (req: Request, res: Response) => {
  const operators = await operatorRepo.find({
    relations: ["districts", "thanas"],
  });
  res.json({ success: true, data: operators });
};

export const getOperatorById = async (req: Request, res: Response) => {
  const operator = await operatorRepo.findOne({
    where: { id: +req.params.id },
    relations: ["districts", "thanas"],
  });

  if (!operator)
    return res.status(404).json({ success: false, message: "Not found" });

  res.json({ success: true, data: operator });
};

export const createOperator = async (req: Request, res: Response) => {
  const operator = operatorRepo.create(req.body);
  const saved = await operatorRepo.save(operator);
  res.status(201).json({ success: true, data: saved });
};

export const updateOperator = async (req: Request, res: Response) => {
  const operator = await operatorRepo.findOneBy({ id: +req.params.id });
  if (!operator)
    return res.status(404).json({ success: false, message: "Not found" });

  operatorRepo.merge(operator, req.body);
  const updated = await operatorRepo.save(operator);
  res.json({ success: true, data: updated });
};

export const deleteOperator = async (req: Request, res: Response) => {
  const result = await operatorRepo.delete(+req.params.id);
  if (result.affected === 0)
    return res.status(404).json({ success: false, message: "Not found" });

  res.json({ success: true, message: "Operator deleted" });
};
