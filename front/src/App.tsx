import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchMusic,
  FetchMusicFavorite,
  MusicItems,
  SetFavorite,
} from "./redux/slices/MusicSlice";
import Login from "./pages/Login/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import Artist from "./pages/artist-page/Artist";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import LeftMenu from "./components/left-menu/LeftMenu";
import RightMenu from "./components/right-menu/RightMenu";
import MainContainer from "./components/main-container/MainContainer";
import { FetchArtist } from "./redux/slices/ArtistSlice";
import { RootState } from "./redux/store";
import CurrentArtist from "./pages/artist-page/CurrentArtist";
import MusicPage from "./pages/MusicPage/MusicPage";
import { LoginDefault } from "./pages/LoginDefault/LoginDefault";
import { fetchAuthMe } from "./redux/slices/MusicSlice";
import { Registration } from "./pages/Register/Register";
import { UserData } from "./redux/slices/ProfileSLice";
import AddMusic from "./pages/AddMusic/AddMusic";
const App: React.FC = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const item = useSelector<RootState, MusicItems>(
    (state) => state.MusicSlice.musics.item
  );
  const token = localStorage.getItem("token");
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchAuthMe());
    // @ts-ignore

    dispatch(FetchMusic());
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <div className="App">
                <LeftMenu />
                <div className="main">
                  <MainContainer />
                  {item ? <MusicPlayer /> : ""}
                </div>
                <RightMenu />

                <div className="background"></div>
              </div>
            ) : (
              <LoginDefault />
            )
          }
        />
        <Route
          path="/artist"
          element={
            <div className="App">
              <LeftMenu />
              <div className="main">
                <Artist />
                {item ? <MusicPlayer /> : ""}
              </div>
              <RightMenu />
              <div className="background"></div>
            </div>
          }
        />
        <Route
          path="/music/:songName"
          element={
            <div className="App">
              <LeftMenu />
              <div className="main">
                <MusicPage />
                {item ? <MusicPlayer /> : ""}
              </div>
              <RightMenu />

              <div className="background"></div>
            </div>
          }
        />

        <Route
          path="/artist/:name"
          element={
            <div className="App">
              <LeftMenu />
              <div className="main">
                <CurrentArtist />
                {item ? <MusicPlayer /> : ""}
              </div>
              <RightMenu />
              <div className="background"></div>
            </div>
          }
        />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<LoginDefault />} />
        <Route path="/addMusic" element={<AddMusic />} />
      </Routes>
    </>
  );
};

export default App;
