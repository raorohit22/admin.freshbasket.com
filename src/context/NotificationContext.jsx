import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import NotificationServices from "@/services/NotificationServices";
import { notifySuccess } from "@/utils/toast";

const NotificationContext = createContext();

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotificationContext must be used within a NotificationProvider");
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [totalUnread, setTotalUnread] = useState(0);
  const [totalDoc, setTotalDoc] = useState(0);
  const [loading, setLoading] = useState(false);

  // Initialize socket connection
  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_APP_API_SOCKET_URL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    setSocket(socketInstance);

    // Socket event listeners
    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    // Real-time notification events
    socketInstance.on("newNotification", (data) => {
      console.log("New notification received:", data);
      // Add new notification to the beginning of the list
      setNotifications(prev => [data.notification, ...prev]);
      setTotalUnread(prev => prev + 1);
      setTotalDoc(prev => prev + 1);
      // Only show toast if it's NOT an order notification
      if (!data.notification.orderId) {
        notifySuccess(data.message);
      }
    });

    socketInstance.on("notificationUpdated", (data) => {
      console.log("Notification updated:", data);
      // Update the specific notification in the list
      setNotifications(prev => 
        prev.map(notification => 
          notification._id === data.notification._id 
            ? data.notification 
            : notification
        )
      );
      setTotalUnread(data.totalUnread);
    });

    socketInstance.on("notificationDeleted", (data) => {
      console.log("Notification deleted:", data);
      // Remove the deleted notification from the list
      setNotifications(prev => 
        prev.filter(notification => notification._id !== data.notificationId)
      );
      setTotalUnread(data.totalUnreadDoc);
      setTotalDoc(data.totalDoc);
    });

    socketInstance.on("notificationsBulkUpdated", (data) => {
      console.log("Bulk notifications updated:", data);
      // Update multiple notifications
      setNotifications(prev => 
        prev.map(notification => 
          data.ids.includes(notification._id)
            ? { ...notification, status: data.status }
            : notification
        )
      );
      setTotalUnread(data.totalUnread);
    });

    socketInstance.on("notificationsBulkDeleted", (data) => {
      console.log("Bulk notifications deleted:", data);
      // Remove multiple notifications
      setNotifications(prev => 
        prev.filter(notification => !data.ids.includes(notification._id))
      );
      setTotalUnread(data.totalUnreadDoc);
      setTotalDoc(data.totalDoc);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Load initial notifications
  const loadNotifications = async (page = 1) => {
    setLoading(true);
    try {
      const res = await NotificationServices.getAllNotification(page);
      if (page === 1) {
        setNotifications(res?.notifications || []);
      } else {
        setNotifications(prev => [...prev, ...(res?.notifications || [])]);
      }
      setTotalUnread(res?.totalUnreadDoc || 0);
      setTotalDoc(res?.totalDoc || 0);
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update notification status
  const updateNotificationStatus = async (id, status) => {
    try {
      await NotificationServices.updateStatusNotification(id, { status });
      // Socket will handle the real-time update
    } catch (error) {
      console.error("Error updating notification status:", error);
      throw error;
    }
  };

  // Delete notification
  const deleteNotification = async (id) => {
    try {
      await NotificationServices.deleteNotification(id);
      // Socket will handle the real-time update
    } catch (error) {
      console.error("Error deleting notification:", error);
      throw error;
    }
  };

  // Bulk operations
  const updateManyNotifications = async (ids, status) => {
    try {
      await NotificationServices.updateManyStatusNotification({ ids, status });
      // Socket will handle the real-time update
    } catch (error) {
      console.error("Error updating multiple notifications:", error);
      throw error;
    }
  };

  const deleteManyNotifications = async (ids) => {
    try {
      await NotificationServices.deleteManyNotification({ ids });
      // Socket will handle the real-time update
    } catch (error) {
      console.error("Error deleting multiple notifications:", error);
      throw error;
    }
  };

  // Load notifications on mount
  useEffect(() => {
    loadNotifications();
  }, []);

  const value = {
    socket,
    notifications,
    totalUnread,
    totalDoc,
    loading,
    loadNotifications,
    updateNotificationStatus,
    deleteNotification,
    updateManyNotifications,
    deleteManyNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}; 