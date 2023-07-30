import { configureStore } from "@reduxjs/toolkit";
import musicSlice from "./slices/MusicSlice";
import profileSLice from "./slices/ProfileSLice";
import artistSlice from "./slices/ArtistSlice";
export const store = configureStore({
  reducer: {
    MusicSlice: musicSlice,
    ProfileSlice: profileSLice,
    ArtistSlice: artistSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
