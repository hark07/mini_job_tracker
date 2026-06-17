import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const applicationSchema = z.object({
  company_name: z.string().min(2),
  job_title: z.string().min(1),
  job_type: z.enum(["INTERNSHIP", "FULL_TIME", "PART_TIME"]),
  status: z.enum(["APPLIED", "INTERVIEWING", "OFFER", "REJECTED"]),
  applied_date: z.string(),
  notes: z.string().optional()
});

export const validate = (schema: any) => 
(req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err: any) {
    res.status(400).json({
      error: err.errors
    });
  }
};