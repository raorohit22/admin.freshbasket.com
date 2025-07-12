import React from "react";
import { Card, CardBody } from "@windmill/react-ui";
import Skeleton from "react-loading-skeleton";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const CardItem = ({
  title,
  Icon,
  quantity,
  amount,
  className,
  loading,
  mode,
  pending,
  todayPending,
  olderPending,
}) => {
  const { getNumberTwo } = useUtilsFunction();

  return (
    <>
      {loading ? (
        <Skeleton
          count={2}
          height={40}
          className="dark:bg-gray-800 bg-gray-200"
          baseColor={`${mode === "dark" ? "#010101" : "#f9f9f9"}`}
          highlightColor={`${mode === "dark" ? "#1a1c23" : "#f8f8f8"} `}
        />
      ) : (
        <Card className="flex h-full">
          <CardBody className="flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
            <div
              className={`flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg ${className}`}
            >
              <Icon />
            </div>

            <div>
              <h6 className="text-sm mb-1 font-medium text-gray-600 dark:text-gray-400">
                <span>{title}</span>{" "}
                {amount && (
                  <span className="text-red-500 text-sm font-semibold">
                    ({getNumberTwo(amount)})
                  </span>
                )}
              </h6>
              {pending && (
                <div className="grid grid-cols-2 gap-4 w-full mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                  <div>
                    <span className="font-semibold">Today</span>{" "}
                    <span className="text-emerald-600 text-sm font-semibold">
                      ({getNumberTwo(todayPending)})
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Older</span>{" "}
                    <span className="text-orange-400 text-sm font-semibold">
                      ({getNumberTwo(olderPending)})
                    </span>
                  </div>
                </div>
              )}

              <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">
                {quantity}
              </p>
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default CardItem;
