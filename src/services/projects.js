import api from './api';

export const getProjects = async ({ estado, prioridad, page = 1, limit = 10 } = {}) => {
  try {
    const response = await api.get('/proyecto', {
      params: {
        consejoComunalId: 1,
        estado,
        prioridad,
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await api.post('/proyecto', {
      ...projectData,
      consejoComunalId: 1,
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    throw error;
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const response = await api.patch(`/proyecto/${id}`, {
      ...projectData,
      consejoComunalId: 1,
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await api.delete(`/proyecto/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    throw error;
  }
};
