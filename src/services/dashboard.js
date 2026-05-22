import api from "./api";

export const getDashboardStats = async (consejoComunalId) => {
  const { data } = await api.get(`/consejo-comunal/${consejoComunalId}`);
  return data;
};
