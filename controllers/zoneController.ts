import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Zone } from "../entities/Zone";

const repo = AppDataSource.getRepository(Zone);

export const getAllZones = async (req: Request, res: Response) => {
  const zones = await repo.find({ relations: ["district", "areas"] });
  res.json({ success: true, message: "Zones fetched.", data: zones });
};

export const getZoneById = async (req: Request, res: Response) => {
  const zone = await repo.findOne({
    where: { id: +req.params.id },
    relations: ["district", "areas"],
  });
  if (!zone)
    return res
      .status(404)
      .json({ success: false, message: "Not found", data: null });

  res.json({ success: true, message: "Zone fetched.", data: zone });
};

export const createZone = async (req: Request, res: Response) => {
  const zone = repo.create(req.body);
  const saved = await repo.save(zone);
  res
    .status(201)
    .json({ success: true, message: "Zone created.", data: saved });
};

export const updateZone = async (req: Request, res: Response) => {
  const zone = await repo.findOneBy({ id: +req.params.id });
  if (!zone)
    return res
      .status(404)
      .json({ success: false, message: "Not found", data: null });

  repo.merge(zone, req.body);
  const updated = await repo.save(zone);
  res.json({ success: true, message: "Zone updated.", data: updated });
};

export const deleteZone = async (req: Request, res: Response) => {
  const result = await repo.delete(+req.params.id);
  if (result.affected === 0)
    return res
      .status(404)
      .json({ success: false, message: "Not found", data: null });

  res.json({
    success: true,
    message: "Zone deleted.",
    data: { deleted: result.affected },
  });
};
