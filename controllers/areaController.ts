import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Area } from "../entities/Area";

const repo = AppDataSource.getRepository(Area);

export const getAllAreas = async (req: Request, res: Response) => {
  const areas = await repo.find({ relations: ["zone"] });
  res.json({ success: true, message: "Areas fetched.", data: areas });
};

export const getAreaById = async (req: Request, res: Response) => {
  const area = await repo.findOne({
    where: { id: +req.params.id },
    relations: ["zone"],
  });
  if (!area)
    return res
      .status(404)
      .json({ success: false, message: "Not found", data: null });

  res.json({ success: true, message: "Area fetched.", data: area });
};

export const createArea = async (req: Request, res: Response) => {
  const area = repo.create(req.body);
  const saved = await repo.save(area);
  res
    .status(201)
    .json({ success: true, message: "Area created.", data: saved });
};

export const updateArea = async (req: Request, res: Response) => {
  const area = await repo.findOneBy({ id: +req.params.id });
  if (!area)
    return res
      .status(404)
      .json({ success: false, message: "Not found", data: null });

  repo.merge(area, req.body);
  const updated = await repo.save(area);
  res.json({ success: true, message: "Area updated.", data: updated });
};

export const deleteArea = async (req: Request, res: Response) => {
  const result = await repo.delete(+req.params.id);
  if (result.affected === 0)
    return res
      .status(404)
      .json({ success: false, message: "Not found", data: null });

  res.json({
    success: true,
    message: "Area deleted.",
    data: { deleted: result.affected },
  });
};
