import { Router } from "express";
import { createAdminValidation, updateAdminValidation } from "../middleware/adminValidation";
import { createAdmin, deleteAdmin, readAdmin, updateAdmin } from "../controller/adminController";

const router = Router()

router.post('/', createAdminValidation, createAdmin)
router.get(`/`, readAdmin)
router.put(`/:id`,updateAdminValidation ,updateAdmin)
router.delete(`/:id`, deleteAdmin)

export default router