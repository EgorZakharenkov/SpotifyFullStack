import React, { useState } from "react";
import styles from "./style.module.css";
import imageBaner from "../../img/bg.jpg";
import check from "../../img/check.png";
import { FaCheck, FaEllipsisH, FaHeadphones } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logout, UserData } from "../../redux/slices/ProfileSLice";

function Baner({ item }) {
  const [follow, setFollow] = React.useState(false);
  const user = useSelector<RootState, UserData>(
    (state) => state.MusicSlice.user
  );
  const category = useSelector<RootState, string>(
    (state) => state.MusicSlice.musics.category
  );
  const ProfileView = useSelector<RootState, boolean>(
    (state) => state.ProfileSlice.ProfileView
  );
  const dispatch = useDispatch();

  const ChangeLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      {ProfileView ? (
        <div className={styles.baner}>
          <img className={styles.imgBaner} src={imageBaner} alt="" />
          <div className={styles.content}>
            <div className={styles.breadCrump}>
              <p>
                Home <span>/Profile</span>
              </p>

              <i>
                <FaEllipsisH />
              </i>
            </div>
            <div className={styles.artist}>
              <div className={styles.left}>
                <div className={styles.name}>
                  <h2>{user.fullName}</h2>
                </div>
                <p>
                  <span>{user.email}</span>
                </p>
              </div>
              <div className={styles.right}>
                <a onClick={() => ChangeLogout()} className={styles.playing}>
                  Logout
                </a>
              </div>
            </div>
          </div>
          <div className={styles.bottomLayer}></div>
        </div>
      ) : (
        <div className={styles.baner}>
          <img className={styles.imgBaner} src={imageBaner} alt="" />
          <div className={styles.content}>
            <div className={styles.breadCrump}>
              <p>
                Home <span>/{category}</span>
              </p>

              <i>
                <FaEllipsisH />
              </i>
            </div>
            <div className={styles.artist}>
              <div className={styles.left}>
                <div className={styles.name}>
                  <h2>{item.songName}</h2>
                  <img src={check} alt="" />
                </div>
                <p>
                  <i>
                    <FaHeadphones />
                  </i>{" "}
                  {item.viewSong}
                  <span>{item.artist}</span>
                </p>
              </div>
              <div className={styles.right}>
                <a className={styles.playing} href="#">
                  Play
                </a>
                <a
                  onClick={() => setFollow(!follow)}
                  className={follow ? styles.follow : styles.noFollow}
                >
                  <i>{follow ? <FaCheck /> : ""}</i>
                  {follow ? "Following" : "Follow"}
                </a>
              </div>
            </div>
          </div>
          <div className={styles.bottomLayer}></div>
        </div>
      )}
    </>
  );
}

export default Baner;
