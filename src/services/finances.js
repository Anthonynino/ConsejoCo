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

export const getReporteFinanzas = async ({ tipo, fechaDesde, fechaHasta } = {}) => {
  const params = new URLSearchParams()
  if (tipo)       params.append('tipo', tipo)
  if (fechaDesde) params.append('fechaDesde', fechaDesde)
  if (fechaHasta) params.append('fechaHasta', fechaHasta)

  const res = await api.get(`/finanza/reporte?${params.toString()}`, {
    responseType: 'blob',
  })

  const url  = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
  const link = document.createElement('a')
  link.href  = url
  link.download = 'reporte_finanzas.pdf'
  link.click()
  URL.revokeObjectURL(url)
}