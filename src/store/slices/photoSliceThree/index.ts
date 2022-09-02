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
        const desc = [
          "A matter of delicate proportions and aesthetics.",
          "The thoughtful making of space is an art.",
          "If a building becomes architecture, then it is art.",
          "Architecture is a visual art, and the buildings speak for themselves.",
          "Find out why so many travelers always come back.",
          "Untouched natural beauty makes this place unique.",
          "Leave society behind and indulge yourself in tranquility",
          "Discover great activities with breathtaking views.",
          "The main challenge is finding the right balance.",
          "Put the right minds together and imagine infinity",
        ];
        state.entitiesThree.map((e, number) => {
          state.photosThree.push({
            url: e.urls.regular,
            // dataSort: state.entities.length - number,
            desc: desc[number],
            title: e.user.name,
            page: 2,
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
