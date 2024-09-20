import { NextFunction, Request, Response } from "express"
import Joi from "joi"

const createAdminSchema = Joi.object({
    admin_name: Joi.string().required(),
    email: Joi.string().required(),
    pass: Joi.string().required(),
})

const createAdminValidation = (req: Request, res: Response, next: NextFunction) => {
    const validation = createAdminSchema.validate(req.body)

    if (validation.error) {
        return res.status(400).json({
            message: validation.error.details.map(item => item.message).join()
        })
    }
    return next()
}

const updateAdminSchema = Joi.object({
    admin_name: Joi.string(),
    email: Joi.string(),
    pass: Joi.string(),
})

const updateAdminValidation = (req: Request, res: Response, next: NextFunction) => {
    const validation = updateAdminSchema.validate(req.body)

    if (validation.error) {
        return res.status(400).json({
            message: validation.error.details.map(item => item.message).join()
        })
    }
    return next()
}

export {createAdminValidation, updateAdminValidation}