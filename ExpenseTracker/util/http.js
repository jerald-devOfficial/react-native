import axios from 'axios'

const BACKEND_URL = process.env.FIREBASE_URL

export function storeExpense(expenseData) {
  axios.post(`${BACKEND_URL}/expenses.json`, expenseData)
}
