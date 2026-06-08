import api from "./api";

export const getMembers = async (consejoComunalId = 1) => {
  const response = await api.get(`/miembro`, {
    params: { consejoComunalId },
  });
  return response.data;
};

export const createMember = async (data) => {
  const response = await api.post(`/miembro`, data);
  return response.data;
};

export const updateMember = async (id, data) => {
  const response = await api.patch(`/miembro/${id}`, data);
  return response.data;
};

export const deleteMember = async (id) => {
  const response = await api.delete(`/miembro/${id}`);
  return response.data;
};
