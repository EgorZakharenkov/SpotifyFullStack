import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
export const FetchMusic = createAsyncThunk("music/fetchMusic", async () => {
  const data = await axios.get("/music");
  return data;
});
export const FetchFavorite = createAsyncThunk("music/fetchFavorite", async () => {
  const data = await axios.get("/favoriteMusic");
  return data;
});

export const FetchRemoveMusic = createAsyncThunk(
  "posts/FetchRemovePost",
  async (_id: number) => {
    await axios.delete(`/music/${_id}`);
  }
);
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

type UserData = {
  _id: string;
  fullName: string;
  email: string;
  token: string;
  FavoriteTracks: MusicItems[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type MusicItems = {
  _id: number;
  songName: string;
  song: string;
  artist: string;
  imgSong: string;
  duration: number;
  favorite: boolean;
  viewSong: number;
  number: number;
};
export type CurrentTrack = {
  volume: number;
};
interface MusicSliceState {
  musics: {
    items: MusicItems[];
    itemsFavorite: MusicItems[];
    itemsDefault: MusicItems[];
    item: MusicItems;
    count: number;
    category: string;
    status: string;
    index: number;
    currentPage: number;
    currentTrack: CurrentTrack;
  };
  user:UserData,
}

const initialState: MusicSliceState = {
  musics: {
    items: [],
    itemsDefault: [],
    itemsFavorite: [],
    item: null,
    count: 5,
    category: "Songs",
    status: "loading",
    index: null,
    currentPage: 0,
    currentTrack: null,
  },
  user:null,
};

export const MusicSlice = createSlice({
  name: "MusicSlice",
  initialState,
  reducers: {
    CurrentItem: (state, action: PayloadAction<MusicItems>) => {
      state.musics.item = action.payload;
    },
    SetCurrentPage: (state, action: PayloadAction<number>) => {
      state.musics.currentPage = action.payload;
    },
    SetMusics: (state, action: PayloadAction<MusicItems[]>) => {
      state.musics.items = action.payload;
    },
    SetCurrentTrack: (state, action: PayloadAction<CurrentTrack>) => {
      state.musics.currentTrack = action.payload;
    },
    PrevTrackNew: (state) => {
      state.musics.index =
        (state.musics.index + state.musics.items.length - 1) %
        state.musics.items.length;
      state.musics.item = state.musics.items[state.musics.index];
    },
    NextTrackNew: (state) => {
      state.musics.index = (state.musics.index + 1) % state.musics.items.length;
      state.musics.item = state.musics.items[state.musics.index];
    },
    SetPopularTracks: (state) => {
      state.musics.items = state.musics.items.sort((a, b) =>
        a.viewSong > b.viewSong ? -1 : 1
      );
    },
    SearchTrack: (state, action: PayloadAction<string>) => {
      state.musics.items = state.musics.itemsDefault.filter((song) => {
        return song.songName
          .toLowerCase()
          .includes(action.payload.toLowerCase());
      });
    },
    Category: (state, action) => {
      state.musics.category = action.payload;
    },
    CurrentIndex: (state, action) => {
      state.musics.index = action.payload;
    },
    SetFavorite:(state)=>{
      for(let item in state.user.FavoriteTracks){
        if(state.user.FavoriteTracks[item]._id === state.musics.item._id){
          state.musics.item.favorite = true
        }
      }

    },
    ChangeSetFavorite:(state)=>{
      state.musics.item.favorite === true ? state.musics.item.favorite = false : state.musics.item.favorite = true
    },
    DefaultTracks:(state)=>{
      state.musics.items = state.musics.itemsDefault
    },
    FetchMusicFavorite:(state,action:PayloadAction<MusicItems[]>)=>{
      state.musics.items = []
      for(let i = 0;i<action.payload.length;i++){
        state.musics.items.push(action.payload[i])
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(FetchMusic.pending, (state, action) => {
      state.musics.status = "loading";
    });
    builder.addCase(FetchMusic.fulfilled, (state, action) => {
      state.musics.items = action.payload.data;
      state.musics.status = "loaded"
      state.musics.itemsDefault = action.payload.data;
    });
    builder.addCase(FetchMusic.rejected, (state) => {
      state.musics.status = "error";
      state.musics.items = [];
      state.musics.itemsDefault = [];
    });
    builder.addCase(FetchFavorite.pending, (state, action) => {
      state.musics.status = "loading";
    });
    builder.addCase(FetchFavorite.fulfilled, (state, action) => {
      state.musics.items = action.payload.data;
      state.musics.status = "loaded"
      state.musics.itemsDefault = action.payload.data;
    });
    builder.addCase(FetchFavorite.rejected, (state) => {
      state.musics.status = "error";
      state.musics.items = [];
      state.musics.itemsDefault = [];
    });
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.user = null;
    });

    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.user = null;
    });
  },

});

export const {
  CurrentItem,
  PrevTrackNew,
  Category,
  CurrentIndex,
  NextTrackNew,
  SetCurrentPage,
  SetCurrentTrack,
  SetPopularTracks,
  SearchTrack,
  SetMusics,
    SetFavorite,
  FetchMusicFavorite,
  DefaultTracks,
  ChangeSetFavorite
} = MusicSlice.actions;
export default MusicSlice.reducer;
