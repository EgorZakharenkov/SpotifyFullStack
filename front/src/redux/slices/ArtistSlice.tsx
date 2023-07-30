import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
import { FetchMusic, FetchMusicFavorite } from "./MusicSlice";

export const FetchArtist = createAsyncThunk("music/fetchArtist", async () => {
  const data = await axios.get("/artist");
  return data;
});

export type ArtistItems = {
  _id: number;
  name: string;
  viewArtist: number;
  imgArtist: string;
};
interface ArtistSliceState {
  items: ArtistItems[];
  item: ArtistItems;
  status: string;
  currentItem: ArtistItems;
}
const initialState: ArtistSliceState = {
  items: [],
  item: null,
  status: "",
  currentItem: null,
};

export const ArtistSlice = createSlice({
  name: "ArtistSlice",
  initialState,
  reducers: {
    SetCurrentArtist: (state, action: PayloadAction<ArtistItems>) => {
      state.item = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FetchArtist.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(FetchArtist.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.status = "loaded";
    });
    builder.addCase(FetchArtist.rejected, (state) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const { SetCurrentArtist } = ArtistSlice.actions;
export default ArtistSlice.reducer;
