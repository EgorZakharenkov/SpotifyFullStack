import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { FaHeadphones, FaHeart, FaRegClock, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  CurrentIndex,
  CurrentItem,
  MusicItems, SetFavorite,
} from "../../redux/slices/MusicSlice";
import axios from "../../axios";
import { RootState } from "../../redux/store";
import {UserData} from "../../redux/slices/ProfileSLice";

const AudioList: React.FC = (props) => {
  const dispatch = useDispatch();
  const items = useSelector<RootState, MusicItems[]>(
    (state) => state.MusicSlice.musics.items
  );
  const category = useSelector<RootState, string>(
    (state) => state.MusicSlice.musics.category
  );
  const Index = useSelector<RootState, number>(
    (state) => state.MusicSlice.musics.index
  );
  const user = useSelector<RootState,UserData>(state=>state.ProfileSlice.data)

  type Item = {
    _id: number;
    favorite: boolean;
    imgSong: string;
    songName: string;
    artist: string;
    duration: number;
    viewSong: number;
  };
  const ChangeCurrentItem = (item: Item, index: number) => {

    dispatch(CurrentIndex(index));
    axios
      .get(`music/${item._id}`)
      .then((res) => {
        dispatch(CurrentItem(res.data));
        dispatch(SetFavorite())

      })
      .catch((err) => console.log("Ошибка при получении трека"));
  };
  return (
    <>
      {items === undefined ? (
        ""
      ) : (
        <div className={styles.audioList}>
          <h2 className={styles.title}>
            The {category} <span>{items.length} songs</span>
          </h2>
          <div className={styles.songsContainer}>
            {items.map((item, index) => (
              <div className={styles.songs}>
                <div className={styles.count}>#{index + 1}</div>
                <div
                  onClick={() => ChangeCurrentItem(item, index)}
                  className={`${styles.song} ${
                    Index === index ? styles.songActive : ""
                  }`}
                >
                  <div className={styles.imgBox}>
                    <img src={item.imgSong} alt="" />
                  </div>
                  <div className={styles.section}>
                    <p className={styles.songName}>
                      {item.songName} <span>{item.artist}</span>
                    </p>
                    <div className={styles.hits}>
                      <p className="hit">
                        <i>
                          <FaHeadphones />
                        </i>
                        {item.viewSong}
                      </p>
                      <p className="duration">
                        <i>
                          <FaRegClock />
                        </i>
                        {item.duration}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AudioList;
