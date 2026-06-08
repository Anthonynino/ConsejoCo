import api from "./api"

export const getTransactions = async (page = 1, limit = 10) => {
  const res = await api.get(`/finanza?page=${page}&limit=${limit}`)
  return res.data
}

export const getResumen = async () => {
  const res = await api.get('/finanza/resumen')
  return res.data
}

export const createTransaction = async (form) => {
  const res = await api.post('/finanza', form)
  return res.data
}