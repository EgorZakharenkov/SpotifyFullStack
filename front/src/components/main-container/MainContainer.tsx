import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Baner from "../Baner/Baner";
import AudioList from "../audioList/audioList";
import { useDispatch, useSelector } from "react-redux";
import BanerFirst from "../Baner/BanerFirst";
import {
  Category,
  DefaultTracks,
  FetchMusic,
  FetchMusicFavorite,
  MusicItems,
  SetFavorite,
  SetPopularTracks,
} from "../../redux/slices/MusicSlice";
import { RootState } from "../../redux/store";
import { fetchAuthMe } from "../../redux/slices/MusicSlice";
import { UserData } from "../../redux/slices/ProfileSLice";
import { Navigate, useNavigate } from "react-router-dom";

const MainContainer: React.FC = (props) => {
  const menuList = ["Songs", "Popular"];
  const [itemActive, setActive] = React.useState(0);
  const item = useSelector<RootState, MusicItems>(
    (state) => state.MusicSlice.musics.item
  );
  const user = useSelector<RootState, UserData>(
    (state) => state.MusicSlice.user
  );
  const items = useSelector<RootState, MusicItems[]>(
    (state) => state.MusicSlice.musics.itemsDefault
  );
  const currentPage = useSelector<RootState, number>(
    (state) => state.MusicSlice.musics.currentPage
  );
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(Category("Songs"));
    dispatch(DefaultTracks());

    // @ts-ignore
    const data = dispatch(fetchAuthMe());
    for (let item in data.FavoriteTracks) {
      dispatch(SetFavorite(data.FavoriteTracks[item]));
    }

    // @ts-ignore
    dispatch(fetchAuthMe());
    dispatch(FetchMusicFavorite(items));
  }, []);

  const dispatch = useDispatch();
  const ChangeCategory = (index) => {
    setActive(index);
    dispatch(Category(menuList[index]));
    if (menuList[index] === "Songs") {
      // @ts-ignore
      dispatch(FetchMusic());
    }
    if (menuList[index] === "Popular") {
      dispatch(SetPopularTracks());
    }
  };
  return (
    <div className={styles.mainContainer}>
      {item ? <Baner item={item} /> : <BanerFirst />}
      <div className={styles.menuList}>
        {menuList.map((item, index) => (
          <a
            className={`${itemActive === index ? styles.active : ""}`}
            onClick={() => ChangeCategory(index)}
            href="#"
          >
            {item}
          </a>
        ))}
      </div>
      <AudioList />
    </div>
  );
};

export default MainContainer;
