import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient({
    errorFormat: "minimal"
})

const createAdmin = async (req: Request, res: Response) => {
    try {
        const admin_name: string = req.body.admin_name
        const email: string = req.body.email
        const pass: string = req.body.pass

        const newAdmin = await prisma.admin.create({
            data: {
                admin_name, email, pass,
            }
        })

        return res.status(200).json({
            message: `New User Admin has been created`,
            data: newAdmin,
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const readAdmin = async (req: Request, res: Response) => {
    try {
        const searchAdmin = req.query.searchAdmin
        const allAdmin = await prisma.admin.findMany({
            where: {
                OR: [
                    {
                        admin_name: {
                            contains: searchAdmin?.toString() || ""
                        }
                    }
                ]
            }
        })

        return res.status(200).json({
            message: `User Admin has been retreived`,
            data: allAdmin
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateAdmin = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const findAdmin = await prisma.admin.findFirst({
            where: { id: Number(id) }
        })

        const { admin_name, email, pass } = req.body

        const saveAdmin = await prisma.admin.update({
            where: { id: Number(id) },
            data: {
                admin_name: admin_name ?? findAdmin?.admin_name,
                email: email ?? findAdmin?.email,
                pass: pass ?? findAdmin?.pass,
            }
        })

        return res.status(200).json({
            message: `User Admin has been updated`,
            data: saveAdmin
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deleteAdmin = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const findAdmin = await prisma.admin.findFirst({
            where: { id: Number(id) }
        })

        const saveAdmin = await prisma.admin.delete({ where: { id: Number(id) } })

        return res.status(200).json({
            message: `User Admin has been removed`,
            data: saveAdmin
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export { createAdmin, readAdmin, updateAdmin, deleteAdmin }