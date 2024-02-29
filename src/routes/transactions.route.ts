import { Router } from "express";

import { createTransactionSchema, getDashBoardSchema, indexTransactionSchema } from "../dtos/transactions.dto";
import { ParamsType, validator } from "../middlewares/validator.middleware";
import { TransactionsController } from "../controllers/transactions.controller";
import { TransactionsFactory } from "../factories/transaction.factory";

export const transactionsRoutes = Router()

const controller = new TransactionsController(TransactionsFactory.getServiceInstance())


transactionsRoutes.post("/", validator({
    schema: createTransactionSchema,
    type: ParamsType.BODY
}), controller.create)

transactionsRoutes.get("/", validator({
    schema: indexTransactionSchema,
    type: ParamsType.QUERY
}), controller.index)

transactionsRoutes.get("/dashboard", validator({
    schema: getDashBoardSchema,
    type: ParamsType.QUERY
}) , controller.getDashBoard)
