import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"

/** create object of prisma */
const prisma = new PrismaClient({
    errorFormat: "minimal"
})
type MedicineType = "Syrup" | "Tablet" | "Powder"

const createMedicine = async (req: Request, res: Response) => {
    try {
        const medicine_name: string = req.body.medicine_name
        const exp_date: Date = new Date(req.body.exp_date)
        const price: number = Number(req.body.price)
        const stock: number = Number(req.body.stock)
        const medicine_type: MedicineType = req.body.medicine_type

        /** save a new medicine to DB */
        const newMedicine = await prisma.medicine.create({
            data: {
                medicine_name, exp_date, price, medicine_type, stock
            }
        })
        return res.status(200).json({
            message: `New medicine has been created`,
            data: newMedicine
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const readMedicine = async (req: Request, res: Response) => {
    try {
        const searchMedicine = req.query.searchMedicine
        /** get all medicine */
        const allMedicine = await prisma.medicine.findMany({
            where: {
                OR: [
                    {
                        medicine_name: {
                            contains: searchMedicine?.toString() || "",
                        },
                    },
                    {
                        medicine_type: {
                            equals: searchMedicine as MedicineType,
                        },
                    },
                ]
            }
        })

        return res.status(200).json({
            message: `medicine has been retrieved`,
            data: allMedicine
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateMedicine = async (req: Request, res: Response) => {
    try {
        /** read id of all medicine that sent at the parameter URL */
        const id = req.params.id

        /** check exiting medicine based on id */
        const findMedicine = await prisma.medicine.findFirst({
            where: { id: Number(id) }
        })

        if (!findMedicine) {
            return res.status(200).json({
                message: `Medicine is not found`
            })
        } else {
            /** read property of medicine from req.body */
            const { medicine_name, medicine_type, stock, price, exp_date } = req.body

            /** update medicine */
            const saveMedicine = await prisma.medicine.update({
                where: { id: Number(id) },
                data: {
                    medicine_name: medicine_name ?? findMedicine?.medicine_name,
                    medicine_type: medicine_type ? medicine_type : findMedicine?.medicine_type,
                    stock: stock ? Number(stock) : findMedicine?.stock,
                    price: price ? Number(price) : findMedicine?.price,
                    exp_date: exp_date ? new Date(exp_date) : findMedicine?.exp_date
                }
            })

            return res.status(200).json({
                message: `Medicine has been updated`,
                data: saveMedicine
            })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deleteMedicine = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const findMedicine = await prisma.medicine.findFirst({
            where: { id: Number(id) }
        })

        if (!findMedicine) {
            return res.status(200).json({
                message: `Medicine is not found`
            })
        } else {
            const saveMedicine = await prisma.medicine.delete({ where: { id: Number(id) } })

            return res.status(200).json({
                message: `Medicine has been removed`,
                data: saveMedicine
            })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}



export { createMedicine, readMedicine, updateMedicine, deleteMedicine }