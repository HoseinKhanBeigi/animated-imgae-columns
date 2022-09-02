import { createSlice } from "@reduxjs/toolkit";
import { fetchPhotosSix } from "../../actions";
import { photosStateSix } from "../../../types";

const initialState: photosStateSix = {
  entitiesSix: [] as any,
  status: "idle",
  currentRequestId: "",
  error: null,
  photosSix: [],
};

const photosSliceSix = createSlice({
  name: "photosFour",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPhotosSix.pending, (state, action) => {
        state.status = "pending";
        state.entitiesSix = [];
      })
      .addCase(fetchPhotosSix.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entitiesSix = [...action.payload];
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
        state.entitiesSix.map((e, number) => {
          state.photosSix.push({
            url: e.urls.regular,
            // dataSort: state.entities.length - number,
            desc: desc[number],
            title: e.user.name,
            page: 2,
          });
        });
      })
      .addCase(fetchPhotosSix.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

// export const { reducePrevius } = photosSlice.actions

export default photosSliceSix.reducer;
