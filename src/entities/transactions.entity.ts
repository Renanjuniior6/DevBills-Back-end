import { Category } from "./categories.entity"

export enum TransactionTypes {
    INCOME = "income",
    EXPENSE = "expense"
}

type TransactionProps = {
    _id?: string,
    title: string,
    amount: number,
    date: Date,
    category: Category,
    type: TransactionTypes
}

export class Transaction {
  public _id?: string
  public title: string
  public amount: number
  public date: Date
  public category: Category
  public type: TransactionTypes

  constructor({ _id, amount, category, date, type, title }: TransactionProps){
    this._id = _id
    this.title = title
    this.amount = amount
    this.date = new Date(date)
    this.category = new Category(category)
    this.type = type
  }

}

