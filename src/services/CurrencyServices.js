import requests from './httpService';

const CurrencyServices = {
  getAllCurrency: async () => {
    return requests.get('/currency');
  },

  getShowingCurrency: async () => {
    return requests.get('/currency/show');
  },

  getCurrencyById: async (id) => {
    return requests.get(`/currency/${id}`);
  },

  addCurrency: async (body) => {
    return requests.post('/currency/add', body);
  },

  addAllCurrency: async (body) => {
    return requests.post('/currency/add/all', body);
  },

  updateCurrency: async (id, body) => {
    return requests.put(`/currency/${id}`, body);
  },

  updateManyCurrencies: async (body) => {
    return requests.patch('currency/update/many', body);
  },

  updateEnabledStatus: async (id, body) => {
    return requests.put(`/currency/status/enabled/${id}`, body);
  },

  updateLiveExchangeRateStatus: async (id, body) => {
    return requests.put(`/currency/status/live-exchange-rates/${id}`, body);
  },

  deleteCurrency: async (id, body) => {
    return requests.delete(`/currency/${id}`, body);
  },

  deleteManyCurrency: async (body) => {
    return requests.patch('/currency/delete/many', body);
  },
};

export default CurrencyServices;
