import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Promo } from "../entities/Promo";

const promoRepo = AppDataSource.getRepository(Promo);

export const getAllPromos = async (req: Request, res: Response) => {
  const promos = await promoRepo.find();
  res.json({ success: true, data: promos });
};

export const getPromoById = async (req: Request, res: Response) => {
  const promo = await promoRepo.findOneBy({ id: +req.params.id });
  if (!promo)
    return res.status(404).json({ success: false, message: "Not found" });

  res.json({ success: true, data: promo });
};

export const createPromo = async (req: Request, res: Response) => {
  const promo = promoRepo.create(req.body);
  const saved = await promoRepo.save(promo);
  res.status(201).json({ success: true, data: saved });
};

export const updatePromo = async (req: Request, res: Response) => {
  const promo = await promoRepo.findOneBy({ id: +req.params.id });
  if (!promo)
    return res.status(404).json({ success: false, message: "Not found" });

  promoRepo.merge(promo, req.body);
  const updated = await promoRepo.save(promo);
  res.json({ success: true, data: updated });
};

export const deletePromo = async (req: Request, res: Response) => {
  const result = await promoRepo.delete(+req.params.id);
  if (result.affected === 0)
    return res.status(404).json({ success: false, message: "Not found" });

  res.json({ success: true, message: "Promo deleted" });
};
