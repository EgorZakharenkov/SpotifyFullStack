import React from "react";
import styles from "./style.module.css";
import { FaPlus } from "react-icons/fa";
import { BsMusicNoteList, BsTrash } from "react-icons/bs";

const MenuPlayList: React.FC = (props) => {
  type PlayList = {
    id: number;
    name: string;
  };
  const playList: PlayList[] = [
    { id: 1, name: "Top hit 2021" },
    { id: 2, name: "Dance" },
    { id: 3, name: "Relaxing Music" },
    { id: 4, name: "Instrumental" },
    { id: 5, name: "Hip Pop" },
    { id: 6, name: "Workout Music" },
  ];
  return (
    <div className={styles.playList}>
      <div className={styles.namePlayList}>
        <p>PlayLists</p>
        <i>
          <FaPlus />
        </i>
      </div>
      <div className={styles.scrollPlayList}>
        {playList.map((item, index) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.wrapper}>
              <i>
                <BsMusicNoteList />
              </i>
              <span>{item.name}</span>
            </div>
            <i>
              <BsTrash />
            </i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPlayList;
