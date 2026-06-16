import api from "./api"

export const generarConstanciaResidencia = async (form) => {
  const res = await api.post('/constancias', form, {
    responseType: 'blob',
  })
  const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `constancia_residencia_${form.cedula}.pdf`
  link.click()
  URL.revokeObjectURL(url)
}

export const generarConstancia = async (form) => {
  const res = await api.post('/constancias', form, {
    responseType: 'blob',
  })
  const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `constancia_${form.cedula}.pdf`
  link.click()
  URL.revokeObjectURL(url)
}