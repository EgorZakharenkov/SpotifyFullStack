import React, { FormEvent, FormHTMLAttributes, useState } from "react";
import styles from "../left-menu/style.module.css";
import { BiSearchAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { SearchTrack } from "../../redux/slices/MusicSlice";

const SearchBox: React.FC = (props) => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch();
  const changeSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(SearchTrack(search));
    setSearch("");
  };

  return (
    <div className={styles.searchBox}>
      <form onSubmit={(e) => changeSearch(e)}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
        />
      </form>
      <i>
        <BiSearchAlt />
      </i>
    </div>
  );
};

export default SearchBox;
