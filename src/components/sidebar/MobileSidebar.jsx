import React, { useContext } from "react";
import { Transition, Backdrop } from "@windmill/react-ui";

//internal import
import SidebarContent from "@/components/sidebar/SidebarContent";
import { SidebarContext } from "@/context/SidebarContext";

function MobileSidebar() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);

  return (
    <Transition show={isSidebarOpen}>
      <>
        <Transition
          enter="transition ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Backdrop onClick={closeSidebar} className="bg-black bg-opacity-50 backdrop-blur-sm" />
        </Transition>

        <Transition
          enter="transition ease-in-out duration-300"
          enterFrom="opacity-0 transform -translate-x-full"
          enterTo="opacity-100 transform translate-x-0"
          leave="transition ease-in-out duration-300"
          leaveFrom="opacity-100 transform translate-x-0"
          leaveTo="opacity-0 transform -translate-x-full"
        >
          <aside className="fixed inset-y-0 z-50 flex-shrink-0 w-64 overflow-y-auto bg-white dark:bg-gray-800 lg:hidden border-r border-gray-200 dark:border-gray-700 shadow-2xl sidebar-scrollbar">
            <div className="h-full flex flex-col">
              <SidebarContent />
            </div>
          </aside>
        </Transition>
      </>
    </Transition>
  );
}

export default MobileSidebar;
