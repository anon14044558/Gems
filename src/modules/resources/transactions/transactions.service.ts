import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Transaction } from './transactions.interface'
import { CreateTransactionDto } from './dto/transaction-request.dto'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transaction') private transactionModel: Model<Transaction>
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    return this.transactionModel.create(createTransactionDto)
  }
}
