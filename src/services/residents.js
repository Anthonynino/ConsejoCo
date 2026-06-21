import api from "./api";

export const getResidents = async (params = {}) => {
  const { data } = await api.get("/familia", { params });
  return data;
};

export const createResident = async (residentData) => {
  const { data } = await api.post("/familia", residentData);
  return data;
};

export const updateResident = async (id, residentData) => {
  const { data } = await api.patch(`/familia/${id}`, residentData);
  return data;
};

export const deleteResident = async (id) => {
  const { data } = await api.delete(`/familia/${id}`);
  return data;
};
