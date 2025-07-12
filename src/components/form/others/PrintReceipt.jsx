import React, { useRef, useState } from "react";
import { FiPrinter } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";

//internal import

import { notifyError } from "@/utils/toast";
import Tooltip from "@/components/tooltip/Tooltip";
import OrderServices from "@/services/OrderServices";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import InvoiceForPrint from "@/components/invoice/InvoiceForPrint";

const PrintReceipt = ({ orderId }) => {
  const printRefTwo = useRef();
  const [orderData, setOrderData] = useState({});
  const { globalSetting } = useUtilsFunction();

  const pageStyle = `
    @media print {
      @page {
        size: ${
          globalSetting?.receipt_size === "A4"
            ? "8.5in 14in"
            : globalSetting?.receipt_size === "3-1/8"
            ? "9.8in 13.8in"
            : globalSetting?.receipt_size === "2-1/4"
            ? "3in 8in"
            : "3.5in 8.5in"
        };
        margin: 0;
        padding: 0;
        font-size: 10px !important;
      }
    
      @page: first {
        size: ${
          globalSetting?.receipt_size === "A4"
            ? "8.5in 14in"
            : globalSetting?.receipt_size === "3-1/8"
            ? "9.8in 13.8in"
            : globalSetting?.receipt_size === "2-1/4"
            ? "3in 8in"
            : "3.5in 8.5in"
        };
        margin: 0;
        font-size: 10px !important;
      }
    }
`;

  const handlePrint = useReactToPrint({
    content: () => printRefTwo.current,
    pageStyle: pageStyle,
    documentTitle: "Invoice",
  });

  const handlePrintReceipt = async (id) => {
    try {
      const res = await OrderServices.getOrderById(id);
      setOrderData(res);
      handlePrint();
    } catch (err) {
      // console.log("order by user id error", err);
      notifyError(err ? err?.response?.data?.message : err?.message);
    }
    // console.log('id', id);
  };

  return (
    <>
      <div style={{ display: "none" }}>
        {Object.keys(orderData).length > 0 && (
          <InvoiceForPrint
            data={orderData}
            printRef={printRefTwo}
            globalSetting={globalSetting}
          />
        )}
      </div>
      <button
        onClick={() => handlePrintReceipt(orderId)}
        type="button"
        className="ml-2 p-2 cursor-pointer text-gray-500 hover:text-emerald-600 focus:outline-none"
      >
        <Tooltip
          id="receipt"
          Icon={FiPrinter}
          title="Print Receipt"
          bgColor="#f59e0b"
        />
      </button>
    </>
  );
};

export default PrintReceipt;
