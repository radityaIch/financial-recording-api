export interface User {
  id: string
  name: string
  email: string
  password: string
  balance: number
}

export interface UserPayload {
  email: string
  password: string
}