import { createSlice } from "@reduxjs/toolkit";
import { fetchPhotosFive } from "../../actions";
import { photosStateFive } from "../../../types";

const initialState: photosStateFive = {
  entitiesFive: [] as any,
  status: "idle",
  currentRequestId: "",
  error: null,
  photosFive: [],
};

const photosSliceFive = createSlice({
  name: "photosFour",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPhotosFive.pending, (state, action) => {
        state.status = "pending";
        state.entitiesFive = [];
      })
      .addCase(fetchPhotosFive.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entitiesFive = [...action.payload];
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
        state.entitiesFive.map((e, number) => {
          state.photosFive.push({
            url: e.urls.regular,
            // dataSort: state.entities.length - number,
            desc: desc[number],
            title: e.user.name,
            page: 2,
          });
        });
      })
      .addCase(fetchPhotosFive.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

// export const { reducePrevius } = photosSlice.actions

export default photosSliceFive.reducer;
