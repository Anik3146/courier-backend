// src/controllers/merchantController.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source"; // Assume AppDataSource is your DB connection
import { Merchant } from "../entities/Merchant";
import { Promo } from "../entities/Promo";
import { Not } from "typeorm";

const JWT_SECRET = process.env.JWT_SECRET || "courier_bd_app";

// Register Merchant
export const registerMerchant = (req: Request, res: Response) => {
  const register = async () => {
    const { company_name, owner_name, mobile_number, email, password } =
      req.body;

    if (!company_name || !owner_name || !mobile_number || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        data: null,
      });
    }

    try {
      // Check for existing email or mobile number
      const existingMerchant = await AppDataSource.manager.findOne(Merchant, {
        where: [{ email }, { mobile_number }],
      });

      if (existingMerchant) {
        const duplicateField =
          existingMerchant.email === email ? "Email" : "Mobile number";
        return res.status(400).json({
          success: false,
          message: `${duplicateField} is already in use`,
          data: null,
        });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      const merchant = new Merchant();
      merchant.company_name = company_name;
      merchant.owner_name = owner_name;
      merchant.mobile_number = mobile_number;
      merchant.email = email;
      merchant.password = hashedPassword;

      // Save to database
      await AppDataSource.manager.save(merchant);

      return res.status(201).json({
        success: true,
        message: "Merchant registered successfully",
        data: {
          id: merchant.id,
          company_name: merchant.company_name,
          owner_name: merchant.owner_name,
          email: merchant.email,
        },
      });
    } catch (error) {
      console.error("Error saving merchant:", error);
      return res.status(500).json({
        success: false,
        message: "Error saving merchant",
        data: null,
      });
    }
  };

  // Call the async function
  register().catch((err) => {
    console.error("Unexpected error:", err);
    return res.status(500).json({
      success: false,
      message: "Unexpected error occurred",
      data: null,
    });
  });
};

// Sign-In Merchant
export const signInMerchant = (req: Request, res: Response) => {
  // The outer function is synchronous
  const signIn = async () => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
        data: null,
      });
    }

    try {
      // Find the merchant by email
      const merchant = await AppDataSource.manager.findOne(Merchant, {
        where: { email },
      });

      if (!merchant || !merchant.password) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
          data: null,
        });
      }

      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, merchant.password);

      if (!passwordMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
          data: null,
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: merchant.id, email: merchant.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Exclude password from the response
      const { password: _password, ...user } = merchant;

      return res.status(200).json({
        success: true,
        message: "Sign-in successful",
        data: { token, user },
      });
    } catch (error) {
      console.error("Error during sign-in:", error);
      return res.status(500).json({
        success: false,
        message: "Error during sign-in",
        data: null,
      });
    }
  };

  // Call the inner async function
  signIn().catch((err) => {
    console.error("Unexpected error:", err);
    return res.status(500).json({
      success: false,
      message: "Unexpected error occurred",
      data: null,
    });
  });
};

// Get Merchant by ID and Match with Token
export const getMerchantById = (req: Request, res: Response) => {
  // The outer function is synchronous
  const getMerchant = async () => {
    const { id } = req.params;
    const { user } = req; // Extract user information from the token

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Merchant ID is required",
        data: null,
      });
    }

    // Convert id to a number (assuming the id is a number in the database)
    const merchantId = parseInt(id, 10);

    if (isNaN(merchantId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Merchant ID format",
        data: null,
      });
    }

    // Ensure the ID from the URL matches the authenticated user's ID
    if (merchantId !== user?.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this merchant's data",
        data: null,
      });
    }

    try {
      // Find the merchant by ID
      const merchant = await AppDataSource.manager.findOne(Merchant, {
        where: { id: merchantId },
      });

      if (!merchant) {
        return res.status(404).json({
          success: false,
          message: "Merchant not found",
          data: null,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Merchant found",
        data: merchant,
      });
    } catch (error) {
      console.error("Error during retrieving merchant by ID:", error);
      return res.status(500).json({
        success: false,
        message: "Error during retrieving merchant by ID",
        data: null,
      });
    }
  };

  // Call the inner async function
  getMerchant().catch((err) => {
    console.error("Unexpected error:", err);
    return res.status(500).json({
      success: false,
      message: "Unexpected error occurred",
      data: null,
    });
  });
};

// Update Merchant by ID
export const updateMerchantById = (req: Request, res: Response) => {
  const update = async () => {
    const merchantId = Number(req.params.id);

    if (merchantId != req.user?.id)
      return res.status(400).json({
        success: false,
        message: "Token or id is not matched",
        data: null,
      });

    const { company_name, owner_name, mobile_number, email, password } =
      req.body;

    if (!merchantId) {
      return res.status(400).json({
        success: false,
        message: "Merchant ID is required",
        data: null,
      });
    }

    try {
      // Find the merchant
      const merchant = await AppDataSource.manager.findOne(Merchant, {
        where: { id: merchantId },
      });

      if (!merchant) {
        return res.status(404).json({
          success: false,
          message: "Merchant not found",
          data: null,
        });
      }

      // Check for duplicate email or mobile_number (excluding current merchant)
      const duplicate = await AppDataSource.manager.findOne(Merchant, {
        where: [
          { email, id: Not(merchantId) },
          { mobile_number, id: Not(merchantId) },
        ],
      });

      if (duplicate) {
        const duplicateField =
          duplicate.email === email ? "Email" : "Mobile number";
        return res.status(400).json({
          success: false,
          message: `${duplicateField} is already in use`,
          data: null,
        });
      }

      // Update fields if they are provided
      if (company_name) merchant.company_name = company_name;
      if (owner_name) merchant.owner_name = owner_name;
      if (mobile_number) merchant.mobile_number = mobile_number;
      if (email) merchant.email = email;
      if (password) {
        merchant.password = await bcrypt.hash(password, 10);
      }

      await AppDataSource.manager.save(merchant);

      // Exclude password from response
      const { password: _pw, ...sanitizedMerchant } = merchant;

      return res.status(200).json({
        success: true,
        message: "Merchant updated successfully",
        data: sanitizedMerchant,
      });
    } catch (error) {
      console.error("Error updating merchant:", error);
      return res.status(500).json({
        success: false,
        message: "Error updating merchant",
        data: null,
      });
    }
  };

  update().catch((err) => {
    console.error("Unexpected error:", err);
    return res.status(500).json({
      success: false,
      message: "Unexpected error occurred",
      data: null,
    });
  });
};

//assign promo code to perchant if it is correct
export const assignPromoToMerchant = async (req: Request, res: Response) => {
  try {
    const merchantRepo = AppDataSource.getRepository(Merchant);
    const promoRepo = AppDataSource.getRepository(Promo);

    const merchant = await merchantRepo.findOne({
      where: { id: +req.params.merchantId },
      relations: ["promos"],
    });

    if (!merchant) {
      return res.status(404).json({
        success: false,
        message: "Merchant not found",
      });
    }

    const promo = await promoRepo.findOneBy({ id: +req.params.promoId });

    if (!promo) {
      return res.status(404).json({
        success: false,
        message: "Promo not found",
      });
    }

    // Prevent duplicates (optional)
    const alreadyAssigned = merchant.promos.find((p) => p.id === promo.id);
    if (alreadyAssigned) {
      return res.status(400).json({
        success: false,
        message: "Promo already assigned to merchant",
      });
    }

    merchant.promos.push(promo);
    const updated = await merchantRepo.save(merchant);

    res.json({
      success: true,
      message: "Promo assigned to merchant",
      data: updated,
    });
  } catch (error) {
    console.error("Error assigning promo to merchant:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
