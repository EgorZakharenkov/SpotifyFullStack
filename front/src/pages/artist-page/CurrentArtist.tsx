import React from "react";
import styles from "./artist.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ArtistItems } from "../../redux/slices/ArtistSlice";
import BanerArtist from "../../components/Baner/BanerArtist";
import AudioList from "../../components/audioList/audioList";
const CurrentArtist: React.FC = (props) => {
  const item = useSelector<RootState, ArtistItems>(
    (state) => state.ArtistSlice.item
  );
  if (!item) return null;
  return (
    <div className={styles.home}>
      <BanerArtist />
      <AudioList />
    </div>
  );
};

export default CurrentArtist;
