import React, { useState } from "react";
import styles from "./style.module.scss";
import { FaHeadphones, FaRegClock } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { CurrentItem, MusicItems } from "../../redux/slices/MusicSlice";
import { RootState } from "../../redux/store";
const AddMusic: React.FC = (props) => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [songName, setSongName] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [textSong, setTextSong] = useState<string>("");
  const [viewSong, setViewSong] = useState<number>(null);
  const [song, setSong] = useState<string>("");
  const [imgSong, setImgSong] = useState<string>(null);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [duration, setDuration] = useState<string>("");
  const navigate = useNavigate();
  type MusicDataType = {
    songName: string;
    artist: string;
    textSong: string;
    viewSong: number;
    song: string;
    imgSong: string;
    favorite: boolean;
    duration: string;
  };
  const dispatch = useDispatch();
  const item = useSelector<RootState, MusicItems>(
    (state) => state.MusicSlice.musics.item
  );
  const ChangeAddMusic = async () => {
    try {
      const MusicData: MusicDataType = {
        songName,
        artist,
        textSong,
        viewSong,
        song,
        imgSong,
        favorite,
        duration,
      };
      console.log(MusicData);
      const { data } = isEditing
        ? await axios.patch(`/music/${id}`, MusicData)
        : await axios.post("/music", MusicData);

      dispatch(CurrentItem(data));
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.back}>
      <div className={styles.inputs}>
        <input
          type="text"
          placeholder="song name"
          onChange={(e) => setSongName(e.target.value)}
          value={songName}
        />
        <input
          type="text"
          placeholder="artist"
          onChange={(e) => setArtist(e.target.value)}
          value={artist}
        />
        <input
          type="text"
          placeholder="textSong"
          onChange={(e) => setTextSong(e.target.value)}
          value={textSong}
        />
        <input
          onChange={(e) => setViewSong(Number(e.target.value))}
          value={viewSong}
          type="text"
          placeholder="viewSong"
        />
        <input
          type="text"
          placeholder="song"
          onChange={(e) => setSong(e.target.value)}
          value={song}
        />
        <input
          type="text"
          placeholder="imgSong"
          onChange={(e) => setImgSong(e.target.value)}
          value={imgSong}
        />
        <input
          type="text"
          placeholder="duration"
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
        />
        <button onClick={ChangeAddMusic}>Добавить</button>
      </div>
      <div className={styles.track}>
        <div className={styles.left}>
          {imgSong ? <img src={imgSong} alt="" /> : ""}
          <div className={styles.names}>
            <span>{songName}</span>
          </div>
        </div>
        <div>
          <p className={styles.artist}>{artist}</p>
        </div>
        <div className={styles.right}>
          <div className={styles.view}>
            <i>
              <FaHeadphones />
            </i>
            <p>{viewSong}</p>
          </div>
          <div className={styles.duration}>
            <i>
              <FaRegClock />
            </i>
            {duration}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMusic;
