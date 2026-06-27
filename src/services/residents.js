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

export const createFamilyMember = async (familyId, bodyData) => {
  const { data } = await api.post(`/familia/${familyId}/familiar`, bodyData)
  return data
}

export const updateFamilyMember = async (familyId, memberId, bodyData) => {
  const { data } = await api.patch(`/familia/${familyId}/familiar/${memberId}`, bodyData)
  return data
}

export const deleteFamilyMember = async (familyId, memberId, bodyData) => {
  const { data } = await api.delete(`/familia/${familyId}/familiar/${memberId}`, bodyData)
  return data
}

export const getFamilyMembers = async (familyId) => {
  const { data } = await api.get(`/familia/${familyId}/familiares`)
  return data
}
