import { Request, Response } from "express";
import * as service from "../service/application.service";

export const getAll = async (req: Request, res: Response) => {
  const data = await service.getAll(req.query);
  res.json(data);
};

export const getById = async (req: Request, res: Response) => {
  const data = await service.getById(req.params.id);
  res.json(data);
};

export const create = async (req: Request, res: Response) => {
  const data = await service.create(req.body);
  res.status(201).json(data);
};

export const update = async (req: Request, res: Response) => {
  const data = await service.update(req.params.id, req.body);
  res.json(data);
};

export const remove = async (req: Request, res: Response) => {
  await service.remove(req.params.id);
  res.json({ message: "Deleted successfully" });
};