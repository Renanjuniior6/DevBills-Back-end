import { StatusCodes } from "http-status-codes";
import { CategoryRepository } from "../database/repositories/categories.repository";
import { TransactionRepository } from "../database/repositories/transactions.repository";
import { CreateTransactionDTO, GetDashBoardDTO, GetFinancialEvolutionDTO, IndexTransactionDTO } from "../dtos/transactions.dto";
import { Transaction } from "../entities/transactions.entity";
import { AppError } from "../errors/app.error";
import { Balance } from "../entities/balance.entity";
import { Expense } from "../entities/expenses.entity";

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

    async getDashBoard({ beginDate, endDate }: GetDashBoardDTO): Promise<{ balance: Balance, expenses: Expense[]}>{
        
        let [ balance, expenses ] = await Promise.all([

            this.transactionsRepository.getBalance({
                beginDate,
                endDate
            }),
            this.transactionsRepository.getExpenses({
                beginDate, endDate
            })
        ])

        if (!balance){
            balance = new Balance({
                _id: null,
                incomes: 0,
                expenses: 0,
                balance: 0
            })
        }

        return { balance, expenses }
    }

    async getFinancialEvolution({ year }: GetFinancialEvolutionDTO): Promise<Balance[]> {
        const financialEvolution = await this.transactionsRepository.getFinancialEvolution({year})

        return financialEvolution
    }

}