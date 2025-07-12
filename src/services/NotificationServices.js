import requests from "@/services/httpService";

const NotificationServices = {
  addNotification: async (body) => {
    return requests.post("/notification/add", body);
  },

  getAllNotification: async (page) => {
    return requests.get(`/notification?page=${page}`);
  },

  updateStatusNotification: async (id, body) => {
    return requests.put(`/notification/${id}`, body);
  },

  updateManyStatusNotification: async (body) => {
    return requests.patch("/notification/update/many", body);
  },

  deleteNotification: async (id) => {
    return requests.delete(`/notification/${id}`);
  },

  deleteNotificationByProductId: async (id) => {
    return requests.delete(`/notification/product-id/${id}`);
  },

  deleteManyNotification: async (body) => {
    return requests.patch(`/notification/delete/many`, body);
  },
};

export default NotificationServices;
