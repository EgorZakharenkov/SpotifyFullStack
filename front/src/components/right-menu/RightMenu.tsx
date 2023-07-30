import React from "react";
import styles from "./style.module.css";
import ProfileiImg from "../../img/bg.jpg";
import { FaHeart } from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {Category, FetchFavorite} from "../../redux/slices/MusicSlice";
import { ProfileView, UserData} from "../../redux/slices/ProfileSLice";
import {RootState} from "../../redux/store";

const RightMenu: React.FC = (props) => {
  const dispatch = useDispatch();
  const user = useSelector<RootState,UserData>(state=>state.MusicSlice.user)
  const ChangeFavorite = () => {
    // @ts-ignore
      dispatch(FetchFavorite())

      dispatch(Category("Favorite"));
  };
  return (
    <div className={styles.rightContainer}>
      <div className={styles.favorite}>
        <i>
          <FaHeart onClick={() => ChangeFavorite()} />
        </i>
      </div>
      <div className={styles.profile}>
        <div>
          <img
            onClick={() => dispatch(ProfileView())}
            src={
              localStorage.getItem("token")
                ? localStorage.getItem("img")
                : ProfileiImg
            }
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default RightMenu;
