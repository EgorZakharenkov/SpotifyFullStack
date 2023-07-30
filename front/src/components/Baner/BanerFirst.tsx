import React from "react";
import styles from "./style.module.css";

import { FaEllipsisH } from "react-icons/fa";
import banerImg from "../../img/bg.jpg";
import { useDispatch, useSelector } from "react-redux";
import imageBaner from "../../img/bg.jpg";
import { RootState } from "../../redux/store";
import { logout, UserData } from "../../redux/slices/ProfileSLice";

function BanerFirst() {
  const category = useSelector<RootState, string>(
    (state) => state.MusicSlice.musics.category
  );
  const ProfileView = useSelector<RootState, boolean>(
    (state) => state.ProfileSlice.ProfileView
  );
  const user = useSelector<RootState, UserData>(
    (state) => state.MusicSlice.user
  );
  const dispatch = useDispatch();

  const ChangeLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      {ProfileView && user ? (
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
          <img className={styles.imgBaner} src={banerImg} alt="" />
          <div className={styles.content}>
            <div className={styles.breadCrump}>
              <p>
                Home <span>/{category}</span>
              </p>
              <i>
                <FaEllipsisH />
              </i>
            </div>
          </div>
          <div className={styles.bottomLayer}></div>
        </div>
      )}
    </>
  );
}

export default BanerFirst;
