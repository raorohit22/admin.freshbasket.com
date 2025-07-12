import { Button, Input } from "@windmill/react-ui";
import exportFromJSON from "export-from-json";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFileEarmarkCode, BsFileEarmarkMedical } from "react-icons/bs";
import {
  FiDownload,
  FiPlus,
  FiUpload,
  FiUploadCloud,
  FiXCircle,
} from "react-icons/fi";
// import { ImFileExcel } from "react-icons/im";
import { useLocation } from "react-router-dom";

//internal import
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import { SidebarContext } from "@/context/SidebarContext";
import ProductServices from "@/services/ProductServices";

const UploadMany = ({
  title,
  totalDoc,
  filename,
  exportData,
  isDisabled,
  handleSelectFile,
  handleRemoveSelectFile,
  handleUploadMultiple,
}) => {
  const location = useLocation();
  const { t } = useTranslation();
  const dRef = useRef();
  const [dropDown, setDropDown] = useState(false);
  const [isImportBoxShown, setIsImportBoxShown] = useState(false);
  const { loading } = useContext(SidebarContext);
  const [loadingExport, setLoadingExport] = useState({
    name: "",
    status: false,
  });

  // console.log(exportData);

  const handleExportCSV = () => {
    if (location.pathname === "/products") {
      setLoadingExport({ name: "csv", status: true });
      ProductServices.getAllProducts({
        page: 1,
        limit: totalDoc,
        category: null,
        title: null,
        price: 0,
      })
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "", status: false });
          exportFromJSON({
            data: res.products,
            fileName: "products",
            exportType: exportFromJSON.types.csv,
          });
        })
        .catch((err) => {
          setLoadingExport({ name: "", status: false });
          setDropDown(false);
          // console.log(err);
        });
    }
    if (location.pathname === "/categories") {
      exportFromJSON({
        data: exportData,
        fileName: "categories",
        exportType: exportFromJSON.types.csv,
      });
    }
    if (location.pathname === "/attributes") {
      exportFromJSON({
        data: exportData,
        fileName: "attributes",
        exportType: exportFromJSON.types.csv,
      });
    }

    if (location.pathname === "/coupons") {
      exportFromJSON({
        data: exportData,
        fileName: "coupons",
        exportType: exportFromJSON.types.csv,
      });
    }
    if (location.pathname === "/customers") {
      exportFromJSON({
        data: exportData,
        fileName: "customers",
        exportType: exportFromJSON.types.csv,
      });
    }
  };

  const handleExportJSON = () => {
    if (location.pathname === "/products") {
      setLoadingExport({ name: "json", status: true });
      ProductServices.getAllProducts({
        page: 1,
        limit: totalDoc,
        category: null,
        title: null,
        price: 0,
      })
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          exportFromJSON({
            data: res.products,
            fileName: "products",
            exportType: exportFromJSON.types.json,
          });
        })
        .catch((err) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          // console.log(err);
        });
    }
    if (location.pathname === "/categories") {
      exportFromJSON({
        data: exportData,
        fileName: "categories",
        exportType: exportFromJSON.types.json,
      });
    }
    if (location.pathname === "/attributes") {
      exportFromJSON({
        data: exportData,
        fileName: "attributes",
        exportType: exportFromJSON.types.json,
      });
    }

    if (location.pathname === "/coupons") {
      exportFromJSON({
        data: exportData,
        fileName: "coupons",
        exportType: exportFromJSON.types.json,
      });
    }
    if (location.pathname === "/customers") {
      exportFromJSON({
        data: exportData,
        fileName: "customers",
        exportType: exportFromJSON.types.json,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dRef?.current?.contains(e.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [dRef]);

  return (
    <div className=" lg:flex md:flex flex-grow-0">
      <div className="flex">
        <div ref={dRef} className="lg:flex-1 md:flex-1 mr-3 sm:flex-none">
          {(title === "Products" ||
            title === "Attribute" ||
            title === "Extra" ||
            title === "Coupon" ||
            title === "Customers" ||
            title === "Categories") && (
            <button
              onClick={() => {
                setDropDown(!dropDown);
              }}
              className="border flex justify-center items-center border-gray-300 hover:border-emerald-400 hover:text-emerald-400  dark:text-gray-300 cursor-pointer h-10 w-20 rounded-md focus:outline-none"
            >
              {/* <BsPlus className="text-4xl" /> */}
              <FiUpload className="mr-2" />
              <span className="text-xs">{t("Export")}</span>
            </button>
          )}
          {dropDown && (
            <ul
              className="origin-top-left absolute  w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 focus:outline-none z-40"
              style={{}}
            >
              <li className="justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 hover:bg-gray-100 text-gray-500 hover:text-emerald-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="focus:outline-none"
                >
                  <span className="flex items-center text-sm">
                    <BsFileEarmarkMedical
                      className="w-4 h-4 mr-3"
                      aria-hidden="true"
                    />

                    <span>
                      Export to CSV
                      {loadingExport.name === "csv" &&
                        loadingExport.status &&
                        "...."}
                    </span>
                  </span>
                </button>
              </li>

              <li className="justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 hover:bg-gray-100 text-gray-500 hover:text-emerald-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                <button
                  type="button"
                  className="focus:outline-none"
                  onClick={handleExportJSON}
                >
                  <span className="flex items-center text-sm">
                    <BsFileEarmarkCode
                      className="w-4 h-4 mr-3"
                      aria-hidden="true"
                    />
                    <span>
                      Export to JSON
                      {loadingExport.name === "json" &&
                        loadingExport.status &&
                        "...."}
                    </span>
                  </span>
                </button>
              </li>
            </ul>
          )}
        </div>

        <div className="lg:flex-1 md:flex-1 mr-3  sm:flex-none">
          <button
            onClick={() => setIsImportBoxShown(!isImportBoxShown)}
            className="border flex justify-center items-center h-10 w-20 hover:text-yellow-400  border-gray-300 dark:text-gray-300 cursor-pointer  py-2 hover:border-yellow-400 rounded-md focus:outline-none"
          >
            <FiDownload className="mr-2" />
            <span className="text-xs">Import</span>
          </button>
        </div>
      </div>

      {isImportBoxShown && (
        <>
          <div className="w-full my-2 lg:my-0 md:my-0 flex">
            <div className="h-10 border border-dashed border-emerald-500 rounded-md">
              <label className="w-full rounded-lg h-10 flex justify-center items-center text-xs dark:text-gray-400 leading-none">
                <Input
                  disabled={isDisabled}
                  type="file"
                  accept=".csv,.xls,.json"
                  onChange={handleSelectFile}
                />
                {filename ? (
                  filename
                ) : (
                  <>
                    <FiUploadCloud className="mx-2 text-emerald-500 text-lg dark:text-gray-400" />{" "}
                    {t("SelectYourJSON")} {title} {t("File")}
                  </>
                )}
                {filename && (
                  <span
                    onClick={handleRemoveSelectFile}
                    type="button"
                    className="text-red-500 focus:outline-none mx-4 text-lg"
                  >
                    <FiXCircle />
                  </span>
                )}
              </label>
            </div>

            <div className="flex">
              {loading ? (
                <Button className="ml-2 h-10">
                  <img
                    src={spinnerLoadingImage}
                    alt="Loading"
                    width={20}
                    height={10}
                  />{" "}
                  <span className="font-serif ml-2 font-light">Processing</span>
                </Button>
              ) : (
                <Button
                  onClick={handleUploadMultiple}
                  className="h-10 ml-2 px-2"
                >
                  <span className="">
                    <FiPlus />
                  </span>
                  <span className="text-sx w-20">{t("ImportNow")}</span>
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default UploadMany;
