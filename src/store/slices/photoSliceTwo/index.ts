import { createSlice } from "@reduxjs/toolkit";
import { fetchPhotosTwo } from "../../actions";
import { photosStateTwo } from "../../../types";

const initialState: photosStateTwo = {
  entitiesTwo: [] as any,
  status: "idle",
  currentRequestId: "",
  error: null,
  photosTwo: [],
};

const photosSliceTwo = createSlice({
  name: "photosTwo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPhotosTwo.pending, (state, action) => {
        state.status = "pending";
        state.entitiesTwo = [];
      })
      .addCase(fetchPhotosTwo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entitiesTwo = [...action.payload];
        let a = 0;
        let z = 0;
        let k = 0;
        state.entitiesTwo.map((e, number) => {
          z = state.entitiesTwo[0] + a;
          k = state.entitiesTwo[number + 1] + a;
          if (k - z !== 3) {
            a += 1;
          }
          z = number + a;
          state.photosTwo.push({
            url: e.urls.regular,
            dataSort: z + number,
            date: new Date("1990" + number).getFullYear(),
            name: e.user.name,
          });
        });
      })
      .addCase(fetchPhotosTwo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

// export const { reducePrevius } = photosSlice.actions

export default photosSliceTwo.reducer;
