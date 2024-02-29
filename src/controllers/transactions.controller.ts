import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TransactionsService } from "../services/transactions.service";
import { CreateTransactionDTO, GetDashBoardDTO, IndexTransactionDTO } from "../dtos/transactions.dto";

export class TransactionsController {

    constructor(private transactionsService: TransactionsService){}

    create = async (req: Request<unknown, unknown, CreateTransactionDTO>, res: Response, next: NextFunction) => {
        
        try {
            const { title, amount, categoryId, date, type } = req.body

            const result = await this.transactionsService.create({ title, amount, categoryId, date, type })

            return res.status(StatusCodes.CREATED).json(result)
    
        } catch (err) {
            next(err)
        }
} 

    index = async (req: Request<unknown, unknown, unknown, IndexTransactionDTO>, res: Response, next: NextFunction) => {
            
        try {
            const { title, categoryId, beginDate, endDate } = req.query

            const result = await this.transactionsService.index({ title, categoryId, beginDate, endDate })

            return res.status(StatusCodes.OK).json(result)

        } catch (err) {
            next(err)
        }
    } 

    getDashBoard = async (req: Request<unknown, unknown, unknown, GetDashBoardDTO>, res: Response, next: NextFunction) => {
            
        try {
            const { beginDate, endDate } = req.query

            const result = await this.transactionsService.getDashBoard({ beginDate, endDate })

            return res.status(StatusCodes.OK).json(result)

        } catch (err) {
            next(err)
        }
    } 
}