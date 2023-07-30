import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { MusicItems } from "./MusicSlice";

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

export type UserData = {
  _id: string;
  fullName: string;
  email: string;
  token: string;
  FavoriteTracks: MusicItems[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
interface ProfileState {
  ProfileView: boolean;
  ProfileId: string;
  status: string;
  data: UserData;
}

const initialState = {
  ProfileView: false,
  ProfileId: null,
  data: null,
  status: "",
};
export const ProfileSLice = createSlice({
  name: "ProfileSlice",
  initialState,
  reducers: {
    ProfileView: (state) => {
      state.ProfileView = !state.ProfileView;
    },
    ProfileIdCheck: (state, action) => {
      state.ProfileId = action.payload;
    },
    logout: (s) => {
      s.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });

    builder.addCase(fetchRegister.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });
  },
});

export const { ProfileView, ProfileIdCheck, logout } = ProfileSLice.actions;
export default ProfileSLice.reducer;
