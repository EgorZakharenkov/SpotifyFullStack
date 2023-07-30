import React from "react";
import styles from "./style.module.css";
import { FaSpotify, FaEllipsisH } from "react-icons/fa";
import MenuList from "../leftMenuList/MenuList";
import SearchBox from "../searchBox/searchBox";
import MenuPlayList from "../MenuPlayList/MenuPlayList";
import TrackList from "../TrackList/TrackList";

const LeftMenu: React.FC = (props) => {
  return (
    <div className={styles.leftMenu}>
      <div className={styles.logoContainer}>
        <i>
          <FaSpotify />
        </i>
        <h2>Spotify</h2>
        <i>
          <FaEllipsisH />
        </i>
      </div>
      <SearchBox />
      <MenuList />
      <MenuPlayList />
      <TrackList />
    </div>
  );
};

export default LeftMenu;
