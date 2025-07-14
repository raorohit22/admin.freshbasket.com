import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";

const useNotification = () => {
	const dispatch = useDispatch();
	const [socket, setSocket] = useState(null);
	const [updated, setUpdated] = useState(false);

	useEffect(() => {
		// Connect to socket server
		const socketInstance = io(import.meta.env.VITE_APP_API_SOCKET_URL, {
			transports: ["websocket", "polling"],
			withCredentials: true,
		});

		setSocket(socketInstance);

		// Socket connection event handlers
		socketInstance.on("connect", () => {
			console.log("Socket connected:", socketInstance.id);
		});

		socketInstance.on("connect_error", (error) => {
			console.error("Socket connection error:", error);
		});

		socketInstance.on("disconnect", (reason) => {
			console.log("Socket disconnected:", reason);
		});

		// Listen for real-time notification events
		socketInstance.on("newNotification", (data) => {
			console.log("New notification received:", data);
			setUpdated(true);
			// You can add toast notification here
			// toast.success(data.message);
		});

		socketInstance.on("notificationUpdated", (data) => {
			console.log("Notification updated:", data);
			setUpdated(true);
		});

		socketInstance.on("notificationDeleted", (data) => {
			console.log("Notification deleted:", data);
			setUpdated(true);
		});

		socketInstance.on("notificationsBulkUpdated", (data) => {
			console.log("Bulk notifications updated:", data);
			setUpdated(true);
		});

		socketInstance.on("notificationsBulkDeleted", (data) => {
			console.log("Bulk notifications deleted:", data);
			setUpdated(true);
		});

		// Listen for the 'notification' event from the server
		socketInstance.on("notification", (notification) => {
			// Update data in real-time here
			console.log("notification", notification);
			if (notification?.option === "globalSetting") {
				// dispatch(removeSetting("globalSetting"));
				// const globalSettingData = {
				//   ...notification.globalSetting,
				//   name: "globalSetting",
				// };
				// dispatch(addSetting(globalSettingData));
			}
			// if(notification?.option === 'storeCustomizationSetting'){

			// }
		});

		return () => {
			// Disconnect the socket when the component unmounts
			socketInstance.disconnect();
		};
	}, []);

	return {
		socket,
		updated,
		setUpdated,
	};
};

export default useNotification;

// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// // import io from "socket.io-client";

// const useNotification = () => {
//   const dispatch = useDispatch();
//   const [socket, setSocket] = useState(null);
//   const [updated, setUpdated] = useState(false);

//   // useEffect(() => {
//   //   setSocket(io(import.meta.env.VITE_APP_API_SOCKET_URL));
//   //   // setSocket(io("https://freshbasket-backend-theta.vercel.app"));
//   // }, []);

//   // useEffect(() => {
//   //   // Listen for the 'notification' event from the server
//   //   socket?.on("notification", (notification) => {
//   //     // Update data in real-time here
//   //     console.log("notification", notification);
//   //     if (notification?.option === "globalSetting") {
//   //       dispatch(removeSetting("globalSetting"));
//   //       const globalSettingData = {
//   //         ...notification.globalSetting,
//   //         name: "globalSetting",
//   //       };
//   //       dispatch(addSetting(globalSettingData));
//   //     }
//   //     // if(notification?.option === 'storeCustomizationSetting'){

//   //     // }
//   //   });

//   //   return () => {
//   //     // Disconnect the socket when the component unmounts
//   //     socket?.disconnect();
//   //   };
//   // }, [socket]);

//   return {
//     socket,
//     updated,
//     setUpdated,
//   };
// };

// export default useNotification;
