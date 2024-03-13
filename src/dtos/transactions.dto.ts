import {z} from "zod"
import { TransactionTypes } from "../entities/transactions.entity"

export const createTransactionSchema = {
    title: z.string(),
    amount: z.number().int().positive(),
    type: z.nativeEnum(TransactionTypes),
    date: z.coerce.date(),
    categoryId: z.string().length(24),
}

const createTransactionObject = z.object(createTransactionSchema)

export type CreateTransactionDTO = z.infer<typeof createTransactionObject>

export const indexTransactionSchema = {
    title: z.string().optional(),
    categoryId: z.string().length(24).optional(),
    beginDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional()
}

const indexTransactionObject = z.object(indexTransactionSchema)
export type IndexTransactionDTO = z.infer< typeof indexTransactionObject>

export const getDashBoardSchema = {
    beginDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional()
}

const getDashBoardObject = z.object(getDashBoardSchema)
export type GetDashBoardDTO = z.infer<typeof getDashBoardObject>

export const getFinancialEvolutionSchema = {
    year: z.string()
}

const getFinancialEvolutionObject = z.object(getFinancialEvolutionSchema)
export type GetFinancialEvolutionDTO = z.infer<typeof getFinancialEvolutionObject>