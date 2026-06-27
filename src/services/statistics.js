import api from "./api";

export const getStatistics = async () => {
  const { data } = await api.get(`/estadistica?consejoComunalId=1`);
  return data;
};

export const getReporteEstadistica = async (tipo, consejoComunalId) => {
  const res = await api.get(`/estadistica/reporte/${tipo}?consejoComunalId=${consejoComunalId}`, {
    responseType: 'blob',
  })
  const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `reporte_estadistica_${tipo}.pdf`
  link.click()
  URL.revokeObjectURL(url)
}