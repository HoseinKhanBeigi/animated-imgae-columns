import { createSlice } from "@reduxjs/toolkit";
import { fetchPhotos } from "../../actions";
import { photosState } from "../../../types";

const initialState: photosState = {
  entities: [] as any,
  status: "idle",
  currentRequestId: "",
  error: null,
  photos: [],
};

const photosSlice = createSlice({
  name: "photosTwo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPhotos.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = [...action.payload];
        let a = 0;
        let z = 0;
        let k = 0;
        state.entities.map((e, number) => {
          z = state.entities[0] + a;
          k = state.entities[number + 1] + a;
          if (k - z !== 3) {
            a += 2;
          }
          z = number + a;
          state.photos.push({
            url: e.urls.small,
            dataSort: z,
            date: new Date(2000 + number).getFullYear(),
            name: e.user.name,
          });
        });
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

// export const { reducePrevius } = photosSlice.actions

export default photosSlice.reducer;
