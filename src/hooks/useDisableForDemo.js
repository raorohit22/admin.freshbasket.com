import { notifyError } from "@/utils/toast";

const useDisableForDemo = () => {
  const handleDisableForDemo = () => {
    const isDisableForDemoEnable =
      import.meta.env.VITE_APP_DISABLE_FOR_DEMO === "true";
    if (isDisableForDemoEnable) {
      notifyError("This feature is disabled for demo!");
      return true; // Indicate that the feature is disabled
    }
    return false; // Indicate that the feature is enabled
  };

  return {
    handleDisableForDemo,
  };
};

export default useDisableForDemo;
