import React, { JSXElementConstructor } from "react";
import { BiPulse } from "react-icons/bi";
import { BsFillHouseFill, BsJournalAlbum } from "react-icons/bs";
import { FaBroadcastTower, FaMicrophoneAlt, FaPodcast } from "react-icons/fa";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentPage } from "../../redux/slices/MusicSlice";
import { RootState } from "../../redux/store";

const MenuList: React.FC = (props) => {
  type MenuList = {
    id: number;
    icon: any;
    name: string;
    link: string;
  };
  const menuList: MenuList[] = [
    {
      id: 1,
      icon: <BsFillHouseFill />,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      icon: <BiPulse />,
      name: "Discover",
      link: "/discover",
    },
    {
      id: 3,
      icon: <FaBroadcastTower />,
      name: "Radio",
      link: "/radio",
    },
    {
      id: 4,
      icon: <FaMicrophoneAlt />,
      name: "Artist",
      link: "/artist",
    },
    {
      id: 5,
      icon: <BsJournalAlbum />,
      name: "Albums",
      link: "/albums",
    },
    {
      id: 6,
      icon: <FaPodcast />,
      name: "Podcasts",
      link: "/podcasts",
    },
  ];
  const dispatch = useDispatch();
  const currentPage = useSelector<RootState, number>(
    (state) => state.MusicSlice.musics.currentPage
  );
  const changeCurrentPage = (
    index: number,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    dispatch(SetCurrentPage(index));
  };
  return (
    <div className={styles.Menu}>
      <h3>Menu</h3>
      <div className={styles.items}>
        {menuList.map((item, index) => (
          <Link
            onClick={(e) => changeCurrentPage(index, e)}
            to={menuList[index].link}
            key={item.id}
            className={`${styles.item} ${
              currentPage === index ? styles.active : ""
            } `}
          >
            <i>{item.icon}</i>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
