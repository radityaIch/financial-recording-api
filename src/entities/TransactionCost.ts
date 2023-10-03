import { User } from "./User"

export interface TransactionCost {
  id: string
  type: 'income' | 'expense',
  cost: number,
  description: string
  user: User
}

export interface TransactionCostPayload {  
  cost: number,
  description: string
  user: string
}