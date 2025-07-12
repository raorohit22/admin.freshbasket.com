import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

//internal import
import useDisableForDemo from "./useDisableForDemo";
import { SidebarContext } from "@/context/SidebarContext";
import AttributeServices from "@/services/AttributeServices";
import CategoryServices from "@/services/CategoryServices";
import CouponServices from "@/services/CouponServices";
import CurrencyServices from "@/services/CurrencyServices";
import LanguageServices from "@/services/LanguageServices";
import ProductServices from "@/services/ProductServices";
import { notifyError, notifySuccess } from "@/utils/toast";

const useBulkActionSubmit = (ids, lang = "en", childId) => {
  const [children, setChildren] = useState("");
  const [tag, setTag] = useState([]);
  const location = useLocation();
  const [checked, setChecked] = useState("");
  const [published, setPublished] = useState(true);
  const [published2, setPublished2] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [defaultCategory, setDefaultCategory] = useState([]);
  const [isFoodItem, setIsFoodItem] = useState(false);
  const [selectCategoryName, setSelectCategoryName] = useState("");

  const { isBulkDrawerOpen, closeBulkDrawer, setIsUpdate } =
    useContext(SidebarContext);

  const { handleDisableForDemo } = useDisableForDemo();
  // console.log(
  //   'defaultCategory',
  //   defaultCategory,
  //   'selectedCategory',
  //   selectedCategory
  // );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (handleDisableForDemo()) {
      return; // Exit the function if the feature is disabled
    }
    try {
      // product data
      const productData = {
        ids: ids,
        categories: selectedCategory?.map((item) => item._id),
        category: defaultCategory[0]?._id,
        productType: [isFoodItem ? "food" : "others"],
        show: data.show,
        status: published ? "show" : "hide",
        tag: JSON.stringify(tag),
      };

      // language data
      const languageData = {
        ids: ids,
        status: published ? "show" : "hide",
      };
      // currencies data
      const currenciesData = {
        ids: ids,
        enabled: published ? "show" : "hide",
        live_exchange_rates: published2 ? "show" : "hide",
      };
      // category data
      const categoryData = {
        ids: ids,
        parentId: checked,
        description: data.description,
        parentName: selectCategoryName,
        status: published ? "show" : "hide",
      };
      // attributes data
      const attributeData = {
        ids: ids,
        option: data.option,
        status: published ? "show" : "hide",
      };

      const childAttributeData = {
        ids: ids,
        currentId: childId,
        changeId: data.groupName,
        status: published ? "show" : "hide",
      };

      const couponData = {
        ids: ids,
        startTime: data.startTime,
        endTime: data.endTime,
        status: published ? "show" : "hide",
      };

      if (location.pathname === "/products") {
        // console.log("productData", productData);
        const res = await ProductServices.updateManyProducts(productData);
        setIsUpdate(true);
        notifySuccess(res.message);
        closeBulkDrawer();
      }

      if (location.pathname === "/coupons") {
        const res = await CouponServices.updateManyCoupons(couponData);
        setIsUpdate(true);
        notifySuccess(res.message);
        closeBulkDrawer();
      }

      if (location.pathname === "/languages") {
        const res = await LanguageServices.updateManyLanguage(languageData);
        setIsUpdate(true);
        notifySuccess(res.message);
        closeBulkDrawer();
        // console.log("languages update Many");
      }

      if (location.pathname === "/currencies") {
        const res = await CurrencyServices.updateManyCurrencies(currenciesData);
        setIsUpdate(true);
        notifySuccess(res.message);
        closeBulkDrawer();
        // console.log("currencies update Many");
      }

      if (
        location.pathname === "/categories" ||
        location.pathname === `/categories/${childId}`
      ) {
        const res = await CategoryServices.updateManyCategory(categoryData);
        setIsUpdate(true);
        notifySuccess(res.message);
        closeBulkDrawer();
      }

      if (location.pathname === "/attributes") {
        const res = await AttributeServices.updateManyAttribute(attributeData);
        setIsUpdate(true);
        notifySuccess(res.message);
        closeBulkDrawer();
      }

      if (
        location.pathname === `/attributes/${location.pathname.split("/")[2]}`
      ) {
        const res = await AttributeServices.updateManyChildAttribute(
          childAttributeData
        );
        setIsUpdate(true);
        notifySuccess(res.message);
        closeBulkDrawer();
      }
    } catch (err) {
      // console.log("err on bulk action", err);
      notifyError(err?.response?.data?.message || err?.message);
    }
  };

  useEffect(() => {
    if (!isBulkDrawerOpen) {
      setValue("parent");
      setValue("children");
      setValue("type");
      setValue("show");
      setValue("name");
      setChildren("");
      setTag([]);
      clearErrors("parent");
      clearErrors("children");
      clearErrors("type");
      clearErrors("name");

      setValue("name");
      setValue("iso_code");
      setValue("call_prefix");
      setValue("currency");
      setValue("zone");
      // setValue('status');
      clearErrors("name");
      clearErrors("iso_code");
      clearErrors("call_prefix");
      clearErrors("currency");
      clearErrors("zone");
      clearErrors("status");

      setValue("name");
      setValue("iso_code");
      setValue("country");
      setValue("zone");

      setValue("description");

      //   setValue('status');
      clearErrors("name");
      clearErrors("iso_code");
      clearErrors("country");
      clearErrors("zone");
      clearErrors("status");
      clearErrors("show");
      clearErrors("description");
      setDefaultCategory([]);
      setSelectedCategory([]);
      return;
    }
  }, [setValue, isBulkDrawerOpen, clearErrors]);

  useEffect(() => {
    setChildren(watch("children"));
  }, [watch, children]);

  return {
    register,
    watch,
    handleSubmit,
    onSubmit,
    errors,
    tag,
    setTag,
    published,
    setPublished,
    published2,
    setPublished2,
    checked,
    setChecked,
    selectedCategory,
    setSelectedCategory,
    defaultCategory,
    setDefaultCategory,
    selectCategoryName,
    setSelectCategoryName,
    isFoodItem,
    setIsFoodItem,
  };
};

export default useBulkActionSubmit;
