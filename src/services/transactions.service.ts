import { StatusCodes } from "http-status-codes";
import { CategoryRepository } from "../database/repositories/categories.repository";
import { TransactionRepository } from "../database/repositories/transactions.repository";
import { CreateTransactionDTO } from "../dtos/transactions.dto";
import { Transaction } from "../entities/transactions.entity";
import { AppError } from "../errors/app.error";

export class TransactionsService {
    constructor( private transactionsRepository: TransactionRepository, private categoriesRepository: CategoryRepository ) {}

    async create({ type, amount, categoryId, date, title }: CreateTransactionDTO): Promise<Transaction>{
    // precisa validar se a categoria existe

    const category = await this.categoriesRepository.findById(categoryId)

    if (!category){
        throw new AppError("Category does not exists.", StatusCodes.NOT_FOUND)
    }

    const transaction = new Transaction({
        title,
        amount,
        category,
        date,
        type,
    })

    const createdTransaction = await this.transactionsRepository.create(transaction)

    return createdTransaction
    }
}