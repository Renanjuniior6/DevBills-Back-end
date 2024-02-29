import { StatusCodes } from "http-status-codes";
import { CategoryRepository } from "../database/repositories/categories.repository";
import { TransactionRepository } from "../database/repositories/transactions.repository";
import { CreateTransactionDTO, GetDashBoardDTO, IndexTransactionDTO } from "../dtos/transactions.dto";
import { Transaction } from "../entities/transactions.entity";
import { AppError } from "../errors/app.error";
import { Balance } from "../entities/balance.entity";

export class TransactionsService {
    constructor( private transactionsRepository: TransactionRepository, private categoriesRepository: CategoryRepository ) {}

    async create({ type, amount, categoryId, date, title }: CreateTransactionDTO): Promise<Transaction>{

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

    async index(filters: IndexTransactionDTO): Promise<Transaction[]> {
        const transactions = await this.transactionsRepository.index(filters)

        return transactions
    }

    async getDashBoard({ beginDate, endDate }: GetDashBoardDTO){
        let balance = await this.transactionsRepository.getBalance({
            beginDate,
            endDate
        })

        if (!balance){
            balance = new Balance({
                _id: null,
                incomes: 0,
                expenses: 0,
                balance: 0
            })
        }

        return balance
    }

}