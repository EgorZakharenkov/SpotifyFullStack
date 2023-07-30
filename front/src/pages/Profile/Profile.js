import React from "react";
import styles from "./style.module.css";

function Profile(props) {

  return (
    <div className={styles.profile}>
      <img src={localStorage.getItem("img")} alt="" />
      <span>{localStorage.getItem("name")}</span>
    </div>
  );
}

export default Profile;
