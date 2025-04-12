import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { District } from "../entities/District";

const repo = AppDataSource.getRepository(District);

export const getAllDistricts = async (req: Request, res: Response) => {
  const districts = await repo.find({ relations: ["zones"] });
  res.json({ success: true, message: "Districts fetched.", data: districts });
};

export const getDistrictById = async (req: Request, res: Response) => {
  const district = await repo.findOne({
    where: { id: +req.params.id },
    relations: ["zones"],
  });
  if (!district)
    return res
      .status(404)
      .json({ success: false, message: "Not found", data: null });

  res.json({ success: true, message: "District fetched.", data: district });
};

export const createDistrict = async (req: Request, res: Response) => {
  const district = repo.create(req.body);
  const saved = await repo.save(district);
  res
    .status(201)
    .json({ success: true, message: "District created.", data: saved });
};

export const updateDistrict = async (req: Request, res: Response) => {
  const district = await repo.findOneBy({ id: +req.params.id });
  if (!district)
    return res
      .status(404)
      .json({ success: false, message: "Not found", data: null });

  repo.merge(district, req.body);
  const updated = await repo.save(district);
  res.json({ success: true, message: "District updated.", data: updated });
};

export const deleteDistrict = async (req: Request, res: Response) => {
  const result = await repo.delete(+req.params.id);
  if (result.affected === 0)
    return res
      .status(404)
      .json({ success: false, message: "Not found", data: null });

  res.json({
    success: true,
    message: "District deleted.",
    data: { deleted: result.affected },
  });
};
