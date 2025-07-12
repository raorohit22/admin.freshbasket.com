import notFound from "@/assets/img/404.svg";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFoundPage = () => {
  const location = useLocation();
  const path = location?.pathname;

  useEffect(() => {
    // Redirect if the path is root '/'
    if (path === "/") {
      window.location.replace("/dashboard");
    }
  }, [path]);

  return (
    <>
      <div className="px-6 py-16 lg:py-20 h-screen flex flex-wrap content-center">
        <div className="block justify-items-stretch mx-auto items-center text-center">
          <img width={650} height={450} src={notFound} alt="404" />
          <h2 className="font-bold font-serif dark:text-gray-200 font-2xl lg:text-4xl leading-7 mb-4">
            Page is not found!
          </h2>
          <p className="text-red-400 text-lg">
            Sorry you don't have access to this page!
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
