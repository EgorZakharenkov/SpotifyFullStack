import React from "react";
import styles from "./MusicPage.module.css";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { MusicItems } from "../../redux/slices/MusicSlice";
import { useNavigate } from "react-router-dom";
const MusicPage: React.FC = (props) => {
  const item = useSelector<RootState, MusicItems>(
    (state) => state.MusicSlice.musics.item
  );
  const navigate = useNavigate();
  if (item === null) {
    navigate("/");
    return null;
  }

  return (
    <div className={styles.home}>
      <div className={styles.block}>
        <img className={styles.bg_image} src={item.imgSong} alt="" />
        <div className={styles.content}>
          <div className={styles.top}>
            <h2>Сейчас играет</h2>
            <span>{item.songName}</span>
          </div>
          <div className={styles.middle}>
            <img src={item.imgSong} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
