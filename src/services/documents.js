import api from './api';

export const getDocuments = async ({ categoria, page = 1, limit = 20 } = {}) => {
  try {
    const response = await api.get('/documento', {
      params: {
        consejoComunalId: 1,
        categoria,
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    throw error;
  }
};

export const createDocument = async (formData) => {
  try {
    const response = await api.post('/documento', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al crear documento:', error);
    throw error;
  }
};

export const updateDocument = async (id, formData) => {
  try {
    const response = await api.patch(`/documento/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al actualizar documento:', error);
    throw error;
  }
};

export const deleteDocument = async (id) => {
  try {
    const response = await api.delete(`/documento/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar documento:', error);
    throw error;
  }
};
