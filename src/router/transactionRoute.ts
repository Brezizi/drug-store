import { Router } from "express";
import { createValidation } from "../middleware/transactionValidation";
import { createTransaction } from "../controller/transactionController";


const router = Router()
router.post(`/`, createValidation, createTransaction)

export default router