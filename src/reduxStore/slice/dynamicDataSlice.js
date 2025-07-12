import { createSlice } from "@reduxjs/toolkit";

const uniqueArrayOfObjects = (arr) => {
  const map = new Map();
  arr?.forEach((obj) => map.set(obj?._id, obj));
  return Array.from(map?.values());
};

const dynamicDataSlice = createSlice({
  name: "data",
  initialState: {
    dynamicData: [],
  },
  reducers: {
    addData: (state, action) => {
      const existsItem = state.dynamicData.find(
        (x) => x.name === action.payload.name
      );
      if (existsItem) {
        return {
          ...state,
          dynamicData: state.dynamicData.map((x) => {
            if (x.name === existsItem.name) {
              return x;
            }
            return x;
          }),
        };
      } else {
        return {
          ...state,
          dynamicData: [...state.dynamicData, action.payload],
        };
      }
    },
    addSingleData: (state, action) => {
      const singleItem = state.dynamicData.find(
        (x) => x.name === action.payload.name
      );

      const items = state.dynamicData.filter(
        (x) => x.name !== action.payload.name
      );

      const uniqueArray = uniqueArrayOfObjects([
        ...singleItem?.data,
        action.payload.data,
      ]);

      const dynamicData = [
        ...items,
        { name: singleItem.name, data: uniqueArray },
      ];

      return {
        ...state,
        dynamicData: dynamicData,
      };
    },
    updateSingleData: (state, action) => {
      // find single item
      const updatedItem = state.dynamicData.find(
        (x) => x.name === action.payload.name
      );

      const notUpdatedItems = state.dynamicData.filter(
        (x) => x.name !== action.payload.name
      );

      const result = updatedItem?.data?.filter(
        (el) => el?._id !== action?.payload?.data?._id
      );
      const updatedArr = [...result, action?.payload?.data];

      const updatedData = [
        ...notUpdatedItems,
        { name: updatedItem.name, data: updatedArr },
      ];

      return {
        ...state,
        dynamicData: updatedData,
      };
    },
    updateMultipleData: (state, action) => {
      // console.log("action.payload>>>>", action.payload);
      const updatedMultipleItem = state.dynamicData.find(
        (x) => x.name === action.payload.name
      );

      const notUpdatedMultipleItems = state.dynamicData.filter(
        (x) => x.name !== action.payload.name
      );

      const multipleUpdatedData = updatedMultipleItem?.data?.filter(
        (el) => !action?.payload?.ids?.includes(el?._id)
      );
      const updatedFinalArr = [
        ...multipleUpdatedData,
        ...action?.payload?.data,
      ];

      const updatedDatMultiple = [
        ...notUpdatedMultipleItems,
        { name: updatedMultipleItem.name, data: updatedFinalArr },
      ];

      return {
        ...state,
        dynamicData: updatedDatMultiple,
      };
    },
    removeData: (state, action) => {
      return {
        ...state,
        dynamicData: state.dynamicData.filter((x) => x.name !== action.payload),
      };
    },
    removeSingleData: (state, action) => {
      // find single item
      const singleRemoveItem = state.dynamicData.find(
        (x) => x.name === action.payload.name
      );

      const notUpdatedRemovedData = state.dynamicData?.filter(
        (x) => x.name !== action.payload.name
      );

      const updatedSingleRemovedData = singleRemoveItem?.data?.filter(
        (el) => el?._id !== action?.payload.id
      );

      const dynamicDataSingleRemoved = [
        ...notUpdatedRemovedData,
        { name: singleRemoveItem.name, data: updatedSingleRemovedData },
      ];

      return {
        ...state,
        dynamicData: dynamicDataSingleRemoved,
      };
    },
    removeMultipleData: (state, action) => {
      // find single item
      const multipleRemoveItem = state.dynamicData.find(
        (x) => x.name === action.payload.name
      );

      const notUpdatedMultipleRemovedData = state.dynamicData?.filter(
        (x) => x.name !== action.payload.name
      );

      const updatedMultipleRemovedData = multipleRemoveItem?.data?.filter(
        (el) => !action?.payload?.ids?.includes(el?._id)
      );

      const dynamicDataMultipleRemoved = [
        ...notUpdatedMultipleRemovedData,
        { name: multipleRemoveItem.name, data: updatedMultipleRemovedData },
      ];

      return {
        ...state,
        dynamicData: dynamicDataMultipleRemoved,
      };
    },

    clearData: (state) => {
      return {
        ...state,
        dynamicData: [],
      };
    },
  },
});

export const {
  addData,
  clearData,
  removeData,
  addSingleData,
  updateSingleData,
  updateMultipleData,
  removeSingleData,
  removeMultipleData,
} = dynamicDataSlice.actions;

export default dynamicDataSlice.reducer;
