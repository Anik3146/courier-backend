// src/controllers/merchantController.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source"; // Assume AppDataSource is your DB connection
import { Merchant } from "../entities/Merchant";

const JWT_SECRET = process.env.JWT_SECRET || "courier_bd_app";

// Register Merchant
export const registerMerchant = (req: Request, res: Response) => {
  // The outer function is synchronous
  const register = async () => {
    const { company_name, owner_name, mobile_number, email, password } =
      req.body;

    if (!company_name || !owner_name || !mobile_number || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      // Find if the email already exists
      const existingMerchant = await AppDataSource.manager.findOne(Merchant, {
        where: { email },
      });

      if (existingMerchant) {
        return res.status(400).json({ message: "Email is already in use" });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      const merchant = new Merchant();
      merchant.company_name = company_name;
      merchant.owner_name = owner_name;
      merchant.mobile_number = mobile_number;
      merchant.email = email;
      merchant.password = hashedPassword;

      // Try saving the merchant to the DB
      await AppDataSource.manager.save(merchant);
      return res
        .status(201)
        .json({ message: "Merchant registered successfully" });
    } catch (error) {
      console.error("Error saving merchant:", error);
      return res.status(500).json({ message: "Error saving merchant" });
    }
  };

  // Call the inner async function
  register().catch((err) => {
    console.error("Unexpected error:", err);
    return res.status(500).json({ message: "Unexpected error occurred" });
  });
};

// Sign-In Merchant
export const signInMerchant = (req: Request, res: Response) => {
  // The outer function is synchronous
  const signIn = async () => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    try {
      // Find the merchant by email
      const merchant = await AppDataSource.manager.findOne(Merchant, {
        where: { email },
      });

      if (!merchant || !merchant.password) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, merchant.password);

      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: merchant.id, email: merchant.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({ message: "Sign-in successful", token });
    } catch (error) {
      console.error("Error during sign-in:", error);
      return res.status(500).json({ message: "Error during sign-in" });
    }
  };

  // Call the inner async function
  signIn().catch((err) => {
    console.error("Unexpected error:", err);
    return res.status(500).json({ message: "Unexpected error occurred" });
  });
};
