import { Request } from "express";
import multer from "multer";
import { ROOT_DIRECTORY } from "../config";

/** define storage to save upload file */

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void ) => {
        const storagePath = `${ROOT_DIRECTORY}/public/medicine-photo/`
        callback(null, storagePath)
    },
    filename: (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void ) => {
        const fileName = `${Math.random()}-${file.originalname}`
        callback(null, fileName)
    }
})

/** define func to filter file extension and file size */
const filterFile = (req: Request, file: Express.Multer.File, callack:multer.FileFilterCallback) => {
    /** define allowed extension */
    const alllowedFile = /png|jpg|jpeg|gif/
    /** check extension of uploded file */
    const isAllow = alllowedFile.test(file.mimetype)

    if (isAllow) {
        callack(null, true)
    } else {
        callack(new Error(`Your file is dangerous`))
    }
}

const uploadMedicinePhoto = multer({
    storage,
    fileFilter: filterFile,
    limits: {fileSize: 2 * 1024 * 1024}
})

export { uploadMedicinePhoto }