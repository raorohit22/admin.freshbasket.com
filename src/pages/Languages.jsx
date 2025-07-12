import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { FiPlus } from "react-icons/fi";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit, FiTrash2 } from "react-icons/fi";
//internal import
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import LanguageTable from "@/components/language/LanguageTable";
import DeleteModal from "@/components/modal/DeleteModal";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import useAsync from "@/hooks/useAsync";
import useFilter from "@/hooks/useFilter";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import LanguageServices from "@/services/LanguageServices";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import LanguageDrawer from "@/components/drawer/LanguageDrawer";
import MainDrawer from "@/components/drawer/MainDrawer";
import AnimatedContent from "@/components/common/AnimatedContent";

const Languages = () => {
  const { toggleDrawer } = useContext(SidebarContext);

  const { allId, handleUpdateMany, handleDeleteMany } = useToggleDrawer();
  const { data, loading, error } = useAsync(LanguageServices.getAllLanguages);
  // console.log("data-language", data);
  const {
    totalResults,
    resultsPerPage,
    dataTable,
    languageRef,
    handleSubmitLanguage,
    handleChangePage,
  } = useFilter(data);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <PageTitle>Languages</PageTitle>
      <MainDrawer>
        <LanguageDrawer />
      </MainDrawer>

      <BulkActionDrawer ids={allId} title="Languages" />

      <DeleteModal
        ids={allId}
        setIsCheck={setIsCheck}
        title="Selected Currencies"
      />

      <AnimatedContent>
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <form
              onSubmit={handleSubmitLanguage}
              className="py-3 grid gap-3 md:flex xl:flex md:justify-between"
            >
              <div className="w-full">
                <Input
                  ref={languageRef}
                  type="search"
                  placeholder={t("SearchLanguage")}
                />
              </div>

              <div className="w-full md:w-56 lg:w-56 xl:w-56">
                <Button
                  disabled={isCheck.length < 1}
                  onClick={() => handleUpdateMany(isCheck)}
                  className="w-full rounded-md h-12 btn-gray text-gray-600"
                >
                  <span className="mr-2">
                    <FiEdit />
                  </span>
                  {t("BulkAction")}
                </Button>
              </div>

              <div className="w-full md:w-32 lg:w-32 xl:w-32">
                <Button
                  disabled={isCheck.length < 1}
                  onClick={() => handleDeleteMany(isCheck)}
                  className="w-full rounded-md h-12 btn-red"
                >
                  <span className="mr-2">
                    <FiTrash2 />
                  </span>
                  {t("Delete")}
                </Button>
              </div>
              <Button onClick={toggleDrawer} className="rounded-md h-12 w-64">
                <span className="mr-2">
                  <FiPlus />
                </span>
                Add language
              </Button>
            </form>
          </CardBody>
        </Card>
      </AnimatedContent>

      {loading ? (
        // <Loading loading={loading} />
        <TableLoading row={12} col={7} width={163} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : (
        data.length !== 0 && (
          <TableContainer className="mb-8 rounded-b-lg">
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
                  <TableCell>{t("LanguagesSr")}</TableCell>
                  <TableCell>{t("LanguagesNname")}</TableCell>
                  <TableCell>{t("LanguagesIsoCode")}</TableCell>
                  <TableCell>{t("LanguagesFlag")}</TableCell>
                  <TableCell className="text-center">
                    {t("LanguagesPublished")}
                  </TableCell>
                  <TableCell className="text-right">
                    {t("LanguagesActions")}
                  </TableCell>
                </tr>
              </TableHeader>
              <LanguageTable
                languages={dataTable}
                isCheck={isCheck}
                setIsCheck={setIsCheck}
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
        )
      )}
      {!loading && data.length === 0 && !error && (
        <NotFound title="Sorry, There are no languages right now." />
      )}
    </>
  );
};

export default Languages;
