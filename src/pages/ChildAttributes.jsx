import {
  Button,
  Card,
  CardBody,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import React, { useContext, useEffect, useState } from "react";
import { FiChevronRight, FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

//internal import
import ChildAttributeTable from "@/components/attribute/ChildAttributeTable";
import AttributeChildDrawer from "@/components/drawer/AttributeChildDrawer";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import MainDrawer from "@/components/drawer/MainDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import Loading from "@/components/preloader/Loading";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useFilter from "@/hooks/useFilter";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import AttributeServices from "@/services/AttributeServices";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import AnimatedContent from "@/components/common/AnimatedContent";

const ChildAttributes = () => {
  let { id } = useParams();

  const { handleDeleteMany, allId, serviceId, handleUpdateMany } =
    useToggleDrawer();
  const { toggleDrawer, lang } = useContext(SidebarContext);
  const { data, loading, error } = useAsync(() =>
    AttributeServices.getAttributeById(id)
  );

  const { showingTranslateValue } = useUtilsFunction();

  const { data: attributes } = useAsync(() =>
    AttributeServices.getAllAttributes({
      type: "attribute",
      option: "Dropdown",
      option1: "Radio",
    })
  );

  const {
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleChangePage,
  } = useFilter(data?.variants);

  // react hook
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [attributeData, setAttributeData] = useState([]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.variants?.map((value) => value._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  // attributes filtering except this id
  useEffect(() => {
    const data = attributes?.filter((value) => value._id !== id);
    setAttributeData(data);
  }, [attributes, id]);

  return (
    <>
      <PageTitle>Attributes Values</PageTitle>

      <DeleteModal
        ids={allId}
        setIsCheck={setIsCheck}
        title="Selected Attribute Value(s)"
      />

      <BulkActionDrawer
        attributes={attributeData}
        ids={allId}
        title="Attribute Value(s)"
        childId={id}
      />

      <MainDrawer>
        <AttributeChildDrawer id={serviceId} />
      </MainDrawer>

      <AnimatedContent>
        <div className="flex items-center pb-4">
          <ol className="flex items-center w-full overflow-hidden font-serif">
            <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold">
              <Link className="text-blue-700" to={`/attributes`}>
                Attributes
              </Link>
            </li>

            <span className="flex items-center font-serif dark:text-gray-400">
              <li className="text-sm mt-[1px]">
                {" "}
                <FiChevronRight />{" "}
              </li>

              <li className="text-sm pl-1 font-semibold dark:text-gray-400">
                {!loading && showingTranslateValue(data?.title)}
              </li>
            </span>
          </ol>
        </div>

        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody className="py-3 grid gap-4 justify-end lg:gap-4 xl:gap-4 md:flex xl:flex">
            <div className="flex justify-end items-end">
              <Button onClick={toggleDrawer} className="rounded-md h-12">
                <span className="mr-3">
                  <FiPlus />
                </span>
                Add Value
              </Button>
            </div>

            <div className="w-full md:w-24 lg:w-24 xl:w-24">
              <Button
                disabled={isCheck.length < 1}
                onClick={() => handleUpdateMany(isCheck)}
                className="w-full rounded-md h-12"
              >
                <FiEdit />
                Bulk Action
              </Button>
            </div>

            <Button
              disabled={isCheck.length < 1}
              onClick={() => handleDeleteMany(isCheck)}
              className="rounded-md h-12 bg-red-500"
            >
              <span className="mr-3">
                <FiTrash2 />
              </span>
              Delete
            </Button>
          </CardBody>
        </Card>
      </AnimatedContent>

      {loading ? (
        <Loading loading={loading} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>
                  <CheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    handleClick={handleSelectAll}
                    isChecked={isCheckAll}
                  />
                </TableCell>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell className="text-center">Status</TableCell>
                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>

            <ChildAttributeTable
              att={data}
              lang={lang}
              loading={loading}
              isCheck={isCheck}
              setIsCheck={setIsCheck}
              childAttributes={dataTable}
            />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no attributes right now." />
      )}
    </>
  );
};

export default ChildAttributes;
