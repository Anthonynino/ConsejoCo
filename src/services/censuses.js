import api from "./api";

export const getCensuses = async (consejoComunalId = 1) => {
  const response = await api.get(`/censo`, {
    params: { consejoComunalId },
  });
  return response.data;
};

export const createCensus = async (data) => {
  const response = await api.post(`/censo`, data);
  return response.data;
};

export const updateCensus = async (id, data) => {
  const response = await api.patch(`/censo/${id}`, data);
  return response.data;
};

export const deleteCensus = async (id) => {
  const response = await api.delete(`/censo/${id}`);
  return response.data;
};