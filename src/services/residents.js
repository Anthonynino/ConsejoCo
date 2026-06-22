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

export const createFamilyMember = async (familyId, data) => {
  const { data } = await api.post(`/api/familia/${familyId}/familiar`, data)
  return data
}

export const updateFamilyMember = async (familyId, memberId, data) => {
  const { data } = await api.patch(`/api/familia/${familyId}/familiar/${memberId}`, data)
  return data
}

export const deleteFamilyMember = async (familyId, memberId, data) => {
  const { data } = await api.delete(`/api/familia/${familyId}/familiar/${memberId}`, data)
  return data
}

export const getFamilyMembers = async (familyId) => {
  const { data } = await api.get(`/familia/${familyId}/familiares`)
  return data
}
