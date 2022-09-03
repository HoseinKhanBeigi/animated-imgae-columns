import { createAsyncAction } from "../../services/action";
export const fetchPhotos = createAsyncAction("/photos", "photoOne");
export const fetchPhotosTwo = createAsyncAction("/photos", "photoTwo");
export const fetchPhotosThree = createAsyncAction("/photos", "photoThree");
