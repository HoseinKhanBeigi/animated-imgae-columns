import { createSlice } from "@reduxjs/toolkit";
import { fetchPhotosThree } from "../../actions";
import { photosStateThree } from "../../../types";

const initialState: photosStateThree = {
  entitiesThree: [] as any,
  status: "idle",
  currentRequestId: "",
  error: null,
  photosThree: [],
};

const photosSliceThree = createSlice({
  name: "photosThree",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPhotosThree.pending, (state, action) => {
        state.status = "pending";
        state.entitiesThree = [];
      })
      .addCase(fetchPhotosThree.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entitiesThree = [...action.payload];
        let a = 0;
        let z = 0;
        let k = 0;
        state.entitiesThree.map((e, number) => {
          z = state.photosThree[0] + a;
          k = state.photosThree[number + 1] + a;
          if (k - z !== 3) {
            a += 3;
          }
          z = a;
          state.photosThree.push({
            url: e.urls.small,
            dataSort: a,
            name: e.user.name,
            date: new Date("1990" + number).getFullYear(),
          });
        });
      })
      .addCase(fetchPhotosThree.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

// export const { reducePrevius } = photosSlice.actions

export default photosSliceThree.reducer;
