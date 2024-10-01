import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient({
    errorFormat: "minimal"
})

type transactionDetailType = {
    medicine_id: number;
    qty: number;
};

const createTransaction = async (req: Request, res: Response) => {
    try {
        /** read a req data */
        const cashier_name: string = req.body.cashier_name
        const order_date: Date = new Date(req.body.order_date)
        const transaction_detail: transactionDetailType[] = req.body.transaction_detail

        /** checking medicine */
        const medicineId: number[] = transaction_detail.map((item) => item.medicine_id)

        /** checking database */
        const findMedicine = await prisma.medicine.findMany({
            where: {
                id: {
                    in: medicineId
                }
            }
        })

        /** check medicine id was not found */
        const notFoundMedicine = medicineId.filter((item) => !findMedicine.map((medicine) => medicine.id).includes(item))

        /** define to save transaction */
        const newTransaction = await prisma.transaction.create({
            data: {
                cashier_name,
                order_date
            }
        })

        /** prepare data for transaction */
        let newDetail = []
        for (let index = 0; index < transaction_detail.length; index++) {
            const { medicine_id, qty } = transaction_detail[index]

            /** find price at each other */
            const medicineItems: any = findMedicine.find((item) => item.id === medicine_id)

            newDetail.push({
                transaction_id: newTransaction.id,
                medicine_id,
                qty,
                order_price: medicineItems.price || 0,
            })
        }

        /** save transaction detail */
        await prisma.transaction_detail.createMany({
            data: newDetail
        })

        return res.status(200).json({
            message: `New transaction has been created`
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export { createTransaction }