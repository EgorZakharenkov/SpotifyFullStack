import React, { useEffect } from "react";
import styles from "./artist.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  ArtistItems,
  FetchArtist,
  SetCurrentArtist,
} from "../../redux/slices/ArtistSlice";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import {Category, fetchAuthMe, FetchMusicFavorite, SetMusics} from "../../redux/slices/MusicSlice";

function Artist(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector<RootState, ArtistItems[]>(
    (state) => state.ArtistSlice.items
  );
  useEffect(() => {
    // @ts-ignore
    dispatch(FetchArtist());
  }, []);
  const ChangeCurrentArtist = (item: ArtistItems) => {
    dispatch(SetCurrentArtist(item));
    axios
      .get(`/artistMusic/${item.name}`)
      .then((res) => {
        dispatch(SetMusics(res.data));
        // @ts-ignore
        dispatch(fetchAuthMe())
        dispatch(FetchMusicFavorite(res.data));

        dispatch(Category("Artist"));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate(`/artist/${item.name}`);
  };
  return (
    <div className={styles.home}>
      <div style={{ flexGrow: 1 }} className={styles.main}>
        <div className={styles.items}>
          {items.map((item, index) => (
            <div
              onClick={() => ChangeCurrentArtist(item)}
              className={styles.item}
            >
              <img src={item.imgArtist} alt="" />
              <div className={styles.name}>
                <span>{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Artist;
