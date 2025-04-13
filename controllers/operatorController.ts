import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Operator } from "../entities/Operator";
import { District } from "../entities/District";
import { Thana } from "../entities/Thana";
import { Agent } from "../entities/Agent";
import { In } from "typeorm";

const operatorRepo = AppDataSource.getRepository(Operator);

export const getAllOperators = async (req: Request, res: Response) => {
  const operators = await operatorRepo.find({
    relations: ["districts", "thanas"],
  });
  res.json({
    success: true,
    message: "Operators fetched successfully",
    data: operators,
  });
};

export const getOperatorById = async (req: Request, res: Response) => {
  const operator = await operatorRepo.findOne({
    where: { id: +req.params.id },
    relations: ["districts", "thanas"],
  });

  if (!operator)
    return res
      .status(404)
      .json({ success: false, message: "Operator not found" });

  res.json({
    success: true,
    message: "Operator fetched successfully",
    data: operator,
  });
};

export const createOperator = async (req: Request, res: Response) => {
  const { name, email, districts, thanas, agents } = req.body;

  try {
    const districtEntities = await AppDataSource.getRepository(District).findBy(
      {
        id: In(districts),
      }
    );

    const thanaEntities = await AppDataSource.getRepository(Thana).findBy({
      id: In(thanas),
    });

    const agentEntities = await AppDataSource.getRepository(Agent).findBy({
      id: In(agents),
    });

    if (
      districtEntities.length !== districts.length ||
      thanaEntities.length !== thanas.length ||
      agentEntities.length !== agents.length
    ) {
      return res.status(400).json({
        success: false,
        message: "One or more related entities not found",
      });
    }

    const operator = operatorRepo.create({
      name,
      email,
      districts: districtEntities,
      thanas: thanaEntities,
      agents: agentEntities,
    });

    const savedOperator = await operatorRepo.save(operator);
    return res.status(201).json({
      success: true,
      message: "Operator created successfully",
      data: savedOperator,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateOperator = async (req: Request, res: Response) => {
  const operatorId = +req.params.id;
  const { name, email, districts, thanas, agents } = req.body;

  try {
    const operator = await operatorRepo.findOne({
      where: { id: operatorId },
      relations: ["districts", "thanas", "agents"],
    });

    if (!operator) {
      return res
        .status(404)
        .json({ success: false, message: "Operator not found" });
    }

    const districtEntities = await AppDataSource.getRepository(District).findBy(
      {
        id: In(districts),
      }
    );

    const thanaEntities = await AppDataSource.getRepository(Thana).findBy({
      id: In(thanas),
    });

    const agentEntities = await AppDataSource.getRepository(Agent).findBy({
      id: In(agents),
    });

    if (
      districtEntities.length !== districts.length ||
      thanaEntities.length !== thanas.length ||
      agentEntities.length !== agents.length
    ) {
      return res.status(400).json({
        success: false,
        message: "One or more related entities not found",
      });
    }

    operator.name = name;
    operator.email = email;
    operator.districts = districtEntities;
    operator.thanas = thanaEntities;
    operator.agents = agentEntities;

    const updatedOperator = await operatorRepo.save(operator);
    return res.json({
      success: true,
      message: "Operator updated successfully",
      data: updatedOperator,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteOperator = async (req: Request, res: Response) => {
  const operatorId = +req.params.id;

  try {
    const operator = await operatorRepo.findOne({
      where: { id: operatorId },
      relations: ["districts", "thanas", "agents"],
    });

    if (!operator) {
      return res
        .status(404)
        .json({ success: false, message: "Operator not found" });
    }

    // Optional: Clear relations before delete
    operator.districts = [];
    operator.thanas = [];
    operator.agents = [];

    await operatorRepo.save(operator);
    await operatorRepo.remove(operator);

    return res.json({
      success: true,
      message: "Operator deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
