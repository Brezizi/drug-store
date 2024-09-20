import { NextFunction, Request, Response } from "express"
import Joi, { optional } from "joi"
import path from "path"
import { ROOT_DIRECTORY } from "../config"
import fs from "fs"


/** create rule or schema for createMedicine */
const createSchema = Joi.object({
    medicine_name: Joi.string().required(),
    stock: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
    exp_date: Joi.date().required(),
    medicine_type: Joi.string().valid('Syrup', 'Tablet', 'Powder').required(),
})

const createValidation = (req: Request, res: Response, next: NextFunction) => {
    const validation = createSchema.validate(req.body)

    if (validation.error) {

        // delete current uploaded file
        let fileName: string = req.file?.filename || ``;
        let pathFile = path.join(ROOT_DIRECTORY, "public", "medicine-photo", fileName);

        // check is file exists
        let fileExists = fs.existsSync(pathFile);

        if (fileExists && fileName !== ``) {
            // delete file
            fs.unlinkSync(pathFile);
        }

        return res.status(400).json({
            message: validation.error.details.map(item => item.message).join()
        })
    }
    return next()
}

const updateSchema = Joi.object({
    medicine_name: Joi.string().optional(),
    stock: Joi.number().min(0).optional(),
    price: Joi.number().min(0).optional(),
    exp_date: Joi.date().optional(),
    medicine_type: Joi.string().valid('Syrup', 'Tablet', 'Powder').optional(),
})

const updateValidation = (req: Request, res: Response, next: NextFunction) => {
    const validation = updateSchema.validate(req.body)

    if (validation.error) {

        // delete current uploaded file
        let fileName: string = req.file?.filename || ``;
        let pathFile = path.join(ROOT_DIRECTORY, "public", "medicine-photo", fileName);

        // check is file exists
        let fileExists = fs.existsSync(pathFile);

        if (fileExists && fileName !== ``) {
            // delete file
            fs.unlinkSync(pathFile);
        }

        return res.status(400).json({
            message: validation.error.details.map(item => item.message).join()
        })
    }
    return next()
}

export { createValidation, updateValidation }