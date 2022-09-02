import { createSlice } from "@reduxjs/toolkit";
import { fetchPhotosFour } from "../../actions";
import { photosStateFour } from "../../../types";

const initialState: photosStateFour = {
  entitiesFour: [] as any,
  status: "idle",
  currentRequestId: "",
  error: null,
  photosFour: [],
};

const photosSliceFour = createSlice({
  name: "photosFour",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPhotosFour.pending, (state, action) => {
        state.status = "pending";
        state.entitiesFour = [];
      })
      .addCase(fetchPhotosFour.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entitiesFour = [...action.payload];
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
        state.entitiesFour.map((e, number) => {
          state.photosFour.push({
            url: e.urls.regular,
            // dataSort: state.entities.length - number,
            desc: desc[number],
            title: e.user.name,
            page: 2,
          });
        });
      })
      .addCase(fetchPhotosFour.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

// export const { reducePrevius } = photosSlice.actions

export default photosSliceFour.reducer;
