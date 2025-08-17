import React, { useState } from "react";
import { NavLink, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoRemoveSharp,
} from "react-icons/io5";

const SidebarSubMenu = ({ route }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <li className="relative sidebar-item" key={route.name}>
      {/* Main Menu Button */}
      <button
        className="group flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="flex items-center">
          <route.icon className="w-5 h-5 mr-3 transition-colors duration-200 group-hover:text-blue-600" aria-hidden="true" />
          <span className="font-medium">{t(`${route.name}`)}</span>
        </span>
        <span className="transition-transform duration-200 ease-in-out">
          {open ? (
            <IoChevronDownOutline className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
          ) : (
            <IoChevronForwardOutline className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
          )}
        </span>
      </button>

      {/* Submenu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <ul className="ml-6 mt-2 space-y-1 border-l-2 border-gray-200 dark:border-gray-600 pl-4">
          {route.routes.map((child, i) => (
            <li key={i + 1} className="relative sidebar-item">
              {child?.outside ? (
                <a
                  href={import.meta.env.VITE_APP_STORE_DOMAIN}
                  target="_blank"
                  className="group flex items-center px-3 py-2 text-sm text-gray-500 dark:text-gray-400 rounded-md transition-all duration-200 hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                  rel="noreferrer"
                >
                  <Route path={child.path} exact={child.exact}>
                    <span
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full transition-all duration-200"
                      aria-hidden="true"
                    ></span>
                  </Route>
                  <IoRemoveSharp className="w-3 h-3 mr-2 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                  <span className="font-medium">{t(`${child.name}`)}</span>
                </a>
              ) : (
                <NavLink
                  to={child.path}
                  className="group flex items-center px-3 py-2 text-sm text-gray-500 dark:text-gray-400 rounded-md transition-all duration-200 hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                  rel="noreferrer"
                >
                  <Route path={child.path} exact={route.exact}>
                    <span
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full transition-all duration-200"
                      aria-hidden="true"
                    ></span>
                  </Route>
                  <IoRemoveSharp className="w-3 h-3 mr-2 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                  <span className="font-medium">{t(`${child.name}`)}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default SidebarSubMenu;
