# Real-Time Notifications Implementation

This document explains the real-time notification system implemented in the Freshbasket Admin Dashboard.

## Overview

The notification system now supports real-time updates using WebSocket connections (Socket.IO) instead of requiring page refreshes. When notifications are created, updated, or deleted, all connected clients receive instant updates.

## Architecture

### Backend (Node.js + Socket.IO)

1. **Socket.IO Server Setup** (`../backend/api/index.js`)
   - Socket.IO server is initialized with CORS configuration
   - Socket instance is passed to notification controller

2. **Notification Controller** (`../backend/controller/notificationController.js`)
   - Enhanced with socket event emissions
   - Emits events for: new notifications, status updates, deletions, bulk operations
   - Uses `setSocketIO()` function to receive socket instance

3. **Socket Events Emitted**:
   - `newNotification` - When a new notification is created
   - `notificationUpdated` - When notification status is updated
   - `notificationDeleted` - When a notification is deleted
   - `notificationsBulkUpdated` - When multiple notifications are updated
   - `notificationsBulkDeleted` - When multiple notifications are deleted

### Frontend (React + Socket.IO Client)

1. **NotificationContext** (`src/context/NotificationContext.jsx`)
   - Centralized state management for notifications
   - Handles socket connections and event listeners
   - Provides real-time updates to all components

2. **Socket Connection** (`src/hooks/useNotification.js`)
   - Manages WebSocket connection lifecycle
   - Handles connection, disconnection, and error events
   - Listens for real-time notification events

3. **Updated Components**:
   - `Header.jsx` - Real-time notification badge and dropdown
   - `Notifications.jsx` - Real-time notification list management
   - `App.jsx` - Wrapped with NotificationProvider

## Features

### Real-Time Updates
- ✅ New notifications appear instantly
- ✅ Notification status changes (read/unread) update in real-time
- ✅ Notification deletions reflect immediately
- ✅ Bulk operations update all connected clients
- ✅ No page refresh required

### Socket Events

#### Backend Events
```javascript
// New notification
io.emit("newNotification", {
  type: "new",
  notification: newNotification,
  message: "New notification received!"
});

// Status update
io.emit("notificationUpdated", {
  type: "statusUpdate",
  notification: updatedNotification,
  totalUnread: totalDoc,
  message: "Notification status updated!"
});

// Deletion
io.emit("notificationDeleted", {
  type: "deleted",
  notificationId: req.params.id,
  totalDoc,
  totalUnreadDoc,
  message: "Notification deleted!"
});
```

#### Frontend Event Listeners
```javascript
// Listen for new notifications
socketInstance.on("newNotification", (data) => {
  setNotifications(prev => [data.notification, ...prev]);
  setTotalUnread(prev => prev + 1);
  notifySuccess(data.message);
});

// Listen for status updates
socketInstance.on("notificationUpdated", (data) => {
  setNotifications(prev => 
    prev.map(notification => 
      notification._id === data.notification._id 
        ? data.notification 
        : notification
    )
  );
  setTotalUnread(data.totalUnread);
});
```

## Setup Instructions

### Backend Setup
1. Ensure Socket.IO is installed: `npm install socket.io`
2. The server is already configured in `../backend/api/index.js`
3. Notification controller is enhanced with socket events

### Frontend Setup
1. Ensure Socket.IO client is installed: `npm install socket.io-client`
2. NotificationProvider wraps the entire app in `App.jsx`
3. Components use `useNotificationContext()` hook

### Environment Variables
```env
# Backend
PORT=5000

# Frontend
VITE_APP_API_SOCKET_URL=http://localhost:5000
```

## Testing

### Test Component
A test component is available at `src/components/common/TestNotification.jsx` and is displayed on the Dashboard for testing purposes.

### Manual Testing
1. Open the admin dashboard in multiple browser tabs
2. Click "Send Test Notification" button
3. Verify notifications appear instantly in all tabs
4. Mark notifications as read in one tab
5. Verify status updates in all tabs
6. Delete notifications and verify real-time removal

### API Testing
```bash
# Create test notification
curl -X POST http://localhost:5000/api/notification/test \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Troubleshooting

### Common Issues

1. **Socket Connection Failed**
   - Check if backend server is running
   - Verify CORS configuration
   - Check network connectivity

2. **Notifications Not Updating**
   - Check browser console for socket errors
   - Verify socket connection status
   - Check if NotificationProvider is properly wrapped

3. **Multiple Socket Connections**
   - Ensure socket cleanup in useEffect
   - Check for component re-renders

### Debug Mode
Enable debug logging by adding to browser console:
```javascript
localStorage.setItem('debug', 'socket.io-client:*');
```

## Performance Considerations

1. **Connection Management**
   - Single socket connection per user
   - Automatic reconnection on disconnection
   - Proper cleanup on component unmount

2. **State Management**
   - Optimistic updates for better UX
   - Minimal re-renders with proper state structure
   - Efficient notification list updates

3. **Error Handling**
   - Graceful fallback to polling if WebSocket fails
   - User-friendly error messages
   - Automatic retry mechanisms

## Security

1. **Authentication**
   - Socket connections require valid JWT token
   - Server-side validation of all operations
   - Proper authorization checks

2. **Data Validation**
   - Input validation on all notification operations
   - Sanitization of notification content
   - Rate limiting on notification creation

## Future Enhancements

1. **Push Notifications**
   - Browser push notifications
   - Mobile push notifications
   - Email notifications

2. **Advanced Features**
   - Notification categories
   - Notification preferences
   - Notification history

3. **Performance**
   - Notification pagination
   - Lazy loading
   - Offline support

## Files Modified

### Backend
- `../backend/api/index.js` - Socket.IO server setup
- `../backend/controller/notificationController.js` - Socket event emissions
- `../backend/routes/notificationRoutes.js` - Test endpoint

### Frontend
- `src/context/NotificationContext.jsx` - New context for real-time state
- `src/hooks/useNotification.js` - Enhanced socket connection
- `src/components/header/Header.jsx` - Real-time notification display
- `src/pages/Notifications.jsx` - Real-time notification management
- `src/App.jsx` - NotificationProvider wrapper
- `src/components/common/TestNotification.jsx` - Test component
- `src/pages/Dashboard.jsx` - Test component integration

## Conclusion

The real-time notification system provides a seamless user experience with instant updates across all connected clients. The implementation is scalable, maintainable, and follows React best practices. 