import { Router } from "express";
import { authValidation, createAdminValidation, updateAdminValidation } from "../middleware/adminValidation";
import { auth, createAdmin, deleteAdmin, readAdmin, updateAdmin } from "../controller/adminController";

const router = Router()

router.post('/', createAdminValidation, createAdmin)
router.get(`/`, readAdmin)
router.put(`/:id`, updateAdminValidation, updateAdmin)
router.delete(`/:id`, deleteAdmin)
router.post(`/auth`, authValidation, auth)

export default router