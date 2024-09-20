import { Router } from "express";
import { createMedicine, deleteMedicine, readMedicine, updateMedicine } from "../controller/medicineController";
import { createValidation, updateValidation } from "../middleware/medicineValidate";
import { uploadMedicinePhoto } from "../middleware/uploadMedicinePhoto";

const router = Router()

/** routo for show medicine */
router.get('/', readMedicine)

/** route for update medicine */
router.put('/:id', [uploadMedicinePhoto.single(`photo`), updateValidation], updateMedicine)

/** route for delete medicine */
router.delete('/:id', deleteMedicine)

/** create medicine */
router.post('/', [uploadMedicinePhoto.single(`photo`), createValidation], createMedicine)

export default router