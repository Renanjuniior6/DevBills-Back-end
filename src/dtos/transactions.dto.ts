import {z} from "zod"
import { TransactionTypes } from "../entities/transactions.entity"

export const createTransactionSchema = {
    title: z.string(),
    amount: z.number().int().positive(),
    type: z.nativeEnum(TransactionTypes),
    date: z.coerce.date(),
    categoryId: z.string(),
}

const createTransactionObject = z.object(createTransactionSchema)

export type CreateTransactionDTO = z.infer<typeof createTransactionObject>