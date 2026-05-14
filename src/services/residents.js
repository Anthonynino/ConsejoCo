import api from "./api";

export const getResidents = async (params = {}) => {
  const { data } = await api.get("/habitante", { params });
  return data;
};

export const createResident = async (residentData) => {
  const { data } = await api.post("/habitante", residentData);
  return data;
};

export const updateResident = async (id, residentData) => {
  const { data } = await api.patch(`/habitante/${id}`, residentData);
  return data;
};

export const deleteResident = async (id) => {
  const { data } = await api.delete(`/habitante/${id}`);
  return data;
};
