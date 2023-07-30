import React, { useState } from "react";
import styles from "./style.module.css";
import { BsFillVolumeUpFill, BsMusicNoteList } from "react-icons/bs";
import { FaDesktop } from "react-icons/fa";
import track from "../../img/track.png";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CurrentTrack, MusicItems } from "../../redux/slices/MusicSlice";

function TrackList(props) {
  const item = useSelector<RootState, MusicItems>(
    (state) => state.MusicSlice.musics.item
  );
  const currentTrack = useSelector<RootState, CurrentTrack>(
    (state) => state.MusicSlice.musics.currentTrack
  );
  const [value, setValue] = useState(1);
  const ChangeVolumeTrack = (event) => {
    setValue(event.target.value);
    currentTrack.volume = Number(value);
  };
  const ChangeClickVolume = (event) => {
    setValue(event.target.value);
    currentTrack.volume = Number(value);
  };

  return (
    <>
      {item ? (
        <div className={styles.trackList}>
          <div className={styles.top}>
            <img src={item.imgSong} alt="" />
            <p>
              {item.songName} <span>{item.artist}</span>
            </p>
          </div>
          <div className={styles.bottom}>
            <i>
              <BsFillVolumeUpFill />
            </i>
            <input
              value={value}
              onClick={(event) => ChangeClickVolume(event)}
              onChange={(event) => ChangeVolumeTrack(event)}
              type="range"
              min="0"
              max="1"
              step="0.1"
            />
            <i>
              <BsMusicNoteList />
            </i>
            <i>
              <FaDesktop />
            </i>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default TrackList;
