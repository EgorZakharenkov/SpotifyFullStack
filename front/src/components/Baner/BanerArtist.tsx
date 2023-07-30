import React from "react";
import styles from "./style.module.css";
import imageBaner from "../../img/bg.jpg";
import check from "../../img/check.png";
import { FaCheck, FaEllipsisH, FaHeadphones } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ArtistItems } from "../../redux/slices/ArtistSlice";
import axios from "../../axios";
import {Category, FetchMusicFavorite, SetMusics} from "../../redux/slices/MusicSlice";
import {fetchAuthMe} from "../../redux/slices/MusicSlice";

const BanerArtist: React.FC = (props) => {
  const dispatch = useDispatch();
  const item = useSelector<RootState, ArtistItems>(
    (state) => state.ArtistSlice.item
  );
  const ChangeMusicsCurrentArtist = () => {
    axios
      .get(`/artistMusic/${item.name}`)
      .then((res) => {
        dispatch(SetMusics(res.data));
        dispatch(Category("Artist"));
          // @ts-ignore
          dispatch(fetchAuthMe())
          dispatch(FetchMusicFavorite(res.data));

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {item ? (
        <div className={styles.baner}>
          <img className={styles.imgBaner} src={item.imgArtist} alt="" />
          <div className={styles.content}>
            <div className={styles.breadCrump}>
              <p>
                Artist / <span>{item.name}</span>
              </p>

              <i>
                <FaEllipsisH />
              </i>
            </div>
            <div className={styles.artist}>
              <div className={styles.left}>
                <div className={styles.name}>
                  <h2 onClick={() => ChangeMusicsCurrentArtist()}>
                    {item.name}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottomLayer}></div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default BanerArtist;
