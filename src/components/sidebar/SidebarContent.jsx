import React, { useContext, useState } from "react";
import { NavLink, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { WindmillContext } from "@windmill/react-ui";

//internal import
import sidebar from "@/routes/sidebar";
// import SidebarSubMenu from "SidebarSubMenu";
import logoDark from "@/assets/img/logo/logo-color.svg";
import logoLight from "@/assets/img/logo/logo-dark.svg";
import { AdminContext } from "@/context/AdminContext";
import SidebarSubMenu from "@/components/sidebar/SidebarSubMenu";
import useGetCData from "@/hooks/useGetCData";

const SidebarContent = () => {
	const { t } = useTranslation();
	const { mode } = useContext(WindmillContext);
	const { dispatch } = useContext(AdminContext);
	const { accessList } = useGetCData();

	// const handleLogOut = () => {
	//   dispatch({ type: "USER_LOGOUT" });
	//   Cookies.remove("adminInfo");
	// };

	const updatedSidebar = sidebar
		.map((route) => {
			// Filter sub-routes if they exist
			if (route.routes) {
				const validSubRoutes = route.routes.filter((subRoute) => {
					const routeKey = subRoute.path.split("?")[0].split("/")[1];
					// console.log("subRoute", routeKey);
					return accessList?.includes(routeKey);
				});

				// Only include the route if it has valid sub-routes
				if (validSubRoutes.length > 0) {
					return { ...route, routes: validSubRoutes };
				}
				return null; // Exclude the main route if no sub-routes are valid
			}
			// Handle top-level route: check root path part
			const routeKey = route.path?.split("?")[0].split("/")[1];
			return routeKey && accessList?.includes(routeKey) ? route : null;
		})
		.filter(Boolean);

	return (
		<div className="flex flex-col h-full">
			{/* Logo Section */}
			<div className="px-6 py-6 border-b border-gray-100 dark:border-gray-700">
				<a className="flex items-center sidebar-item" href="/dashboard">
					{mode === "dark" ? (
						<img
							src={logoLight}
							alt="freshbasket"
							width="135"
							className="transition-all duration-200 hover:opacity-80"
						/>
					) : (
						<img
							src={logoDark}
							alt="freshbasket"
							width="135"
							className="transition-all duration-200 hover:opacity-80"
						/>
					)}
				</a>
			</div>

			{/* Navigation Section */}
			<nav className="flex-1 px-4 py-6 space-y-2">
				<ul className="space-y-1">
					{updatedSidebar?.map((route) =>
						route.routes ? (
							<SidebarSubMenu route={route} key={route.name} />
						) : (
							<li className="relative sidebar-item" key={route.name}>
								<NavLink
									exact
									to={route.path}
									target={`${route?.outside ? "_blank" : "_self"}`}
									className="group flex items-center px-3 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white"
									activeStyle={{
										color: "#3B82F6",
										backgroundColor: "#EFF6FF",
									}}
									rel="noreferrer"
								>
									<Route path={route.path} exact={route.exact}>
										<span
											className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full transition-all duration-200"
											aria-hidden="true"
										></span>
									</Route>
									<route.icon
										className="w-5 h-5 mr-3 transition-colors duration-200 group-hover:text-blue-600"
										aria-hidden="true"
									/>
									<span className="font-medium">{t(`${route.name}`)}</span>
								</NavLink>
							</li>
						)
					)}
				</ul>
			</nav>

			{/* Footer Section - Optional */}
			{/* <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-700">
        <Button 
          onClick={handleLogOut} 
          size="large" 
          className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-all duration-200"
        >
          <span className="flex items-center justify-center">
            <IoLogOutOutline className="mr-2 text-lg" />
            <span className="text-sm font-medium">{t("LogOut")}</span>
          </span>
        </Button>
      </div> */}
		</div>
	);
};

export default SidebarContent;
