import requests from './httpService';

const LanguageServices = {
  getAllLanguages: async () => {
    return requests.get('/language/all');
  },

  getShowingLanguage: async () => {
    return requests.get('/language/show');
  },

  getLanguageById: async (id) => {
    return requests.get(`/language/${id}`);
  },

  addLanguage: async (body) => {
    return requests.post('/language/add', body);
  },

  addAllLanguage: async (body) => {
    return requests.post('/language/add/all', body);
  },

  updateLanguage: async (id, body) => {
    return requests.put(`/language/${id}`, body);
  },

  updateManyLanguage: async (body) => {
    return requests.patch('language/update/many', body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/language/status/${id}`, body);
  },

  deleteLanguage: async (id, body) => {
    return requests.patch(`/language/${id}`, body);
  },

  deleteManyLanguage: async (body) => {
    return requests.patch('/language/delete/many', body);
  },
};

export default LanguageServices;
