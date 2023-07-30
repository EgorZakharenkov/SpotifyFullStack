import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import {
  FaBackward,
  FaForward,
  FaHeart,
  FaPause,
  FaPlay,
  FaRegHeart,
  FaShareAlt,
} from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangeSetFavorite,
  MusicItems,
  NextTrackNew,
  PrevTrackNew,
  SetCurrentTrack,
  SetFavorite,
} from "../../redux/slices/MusicSlice";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

const MusicPlayer: React.FC = (props) => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(null);
  const audioPlayer = useRef<HTMLAudioElement>(null);
  const progressBar = useRef<HTMLInputElement>(null);
  const animationRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const item = useSelector<RootState, MusicItems>(
    (state) => state.MusicSlice.musics.item
  );

  useEffect(() => {
    const second = Math.floor(audioPlayer.current.duration);
    setDuration(second);
  }, [
    audioPlayer?.current?.onloadedmetadata,
    audioPlayer?.current?.readyState,
  ]);

  const CalculateTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMin}:${returnSec}`;
  };
  useEffect(() => {
    dispatch(SetCurrentTrack(audioPlayer.current));
  }, [item]);
  useEffect(() => {
    setIsPlaying(true);
    audioPlayer.current.play();
    progressBar.current.value = String(audioPlayer.current.currentTime);
    animationRef.current = requestAnimationFrame(whilePlaying);
    if (audioPlayer.current.duration != 0) {
      if (currentTime == Math.floor(audioPlayer.current.duration)) {
        dispatch(NextTrackNew());
        dispatch(SetFavorite());
      }
    }
  }, [item, duration, currentTime]);

  const ChangeCurrentTrack = (item) => {
    navigate(`/music/${item.songName}`);
  };
  const ChangePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    } else {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };
  const whilePlaying = () => {
    if (audioPlayer.current) {
      progressBar.current.value = String(audioPlayer.current?.currentTime);
      changeCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };
  const changeProgress = () => {
    audioPlayer.current.currentTime = Number(progressBar.current?.value);
    changeCurrentTime();
  };
  const changeCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--player-played",
      `${(Number(progressBar.current.value) / duration) * 100}%`
    );
    setCurrentTime(Number(progressBar.current?.value));
  };
  const ChangePrevTrack = () => {
    dispatch(PrevTrackNew());
    dispatch(SetFavorite());
  };
  const ChangeNextTrack = () => {
    dispatch(NextTrackNew());
    dispatch(SetFavorite());
  };
  type Item = {
    _id: number;
    favorite: boolean;
    imgSong: string;
    songName: string;
    artist: string;
    duration: number;
    viewSong: number;
  };
  const ChangeItemFavorite = (it: Item) => {
    dispatch(ChangeSetFavorite());
    it.favorite === true
      ? axios.put(`/music/deleteFaforite/${it._id}`)
      : axios.put(`/music/favorite/${it._id}`);
  };
  return (
    <>
      {audioPlayer ? (
        <div className={styles.content}>
          <div className={styles.bg}>
            <img src={item.imgSong} className={styles.bg_image}></img>

            <div className={styles.MusicPlayer}>
              <div
                onClick={() => ChangeCurrentTrack(item)}
                className={styles.songImg}
              >
                <img
                  className={isPlaying ? styles.rot : ""}
                  src={item.imgSong}
                />
              </div>
              <div className={styles.songAttributes}>
                <audio
                  src={item.song}
                  ref={audioPlayer}
                  preload="metadata"
                ></audio>
                <div className={styles.top}>
                  <div className={styles.left}>
                    <div className={styles.songInfo}>
                      <span>{item.songName}</span>
                      <p>{item.artist}</p>
                    </div>

                    <a href={item.song} className={styles.download}>
                      <i>
                        <BsDownload />
                      </i>
                    </a>
                    <div onClick={() => ChangeItemFavorite(item)}>
                      {item.favorite === true ? (
                        <i>
                          <FaHeart />
                        </i>
                      ) : (
                        <i>
                          <FaRegHeart />
                        </i>
                      )}
                    </div>
                  </div>
                  <div className={styles.middle}>
                    <div className={styles.back}>
                      <i>
                        <FaBackward onClick={() => ChangePrevTrack()} />
                      </i>
                    </div>
                    <div
                      onClick={() => ChangePlayPause()}
                      className={styles.PlayPause}
                    >
                      {isPlaying ? (
                        <i>
                          <FaPause />
                        </i>
                      ) : (
                        <i>
                          <FaPlay />
                        </i>
                      )}
                    </div>
                    <div className={styles.next}>
                      <i>
                        <FaForward onClick={() => ChangeNextTrack()} />
                      </i>
                    </div>
                  </div>
                  <div className={styles.right}>
                    <i>
                      <FaShareAlt />
                    </i>
                  </div>
                </div>
                <div className={styles.bottom}>
                  <div className={styles.currentTime}>
                    {CalculateTime(currentTime)}
                  </div>
                  <input
                    min="0"
                    max={duration}
                    type="range"
                    ref={progressBar}
                    onChange={changeProgress}
                  />
                  <div className={styles.duration}>
                    {duration ? CalculateTime(duration) : "00:00"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MusicPlayer;
