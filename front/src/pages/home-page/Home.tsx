import React from 'react';
import LeftMenu from "../../components/left-menu/LeftMenu";
import MainContainer from "../../components/main-container/MainContainer";
import RightMenu from "../../components/right-menu/RightMenu";

import styles from"./style.module.css"
function Home(props) {
    return (
        <div className={styles.home}>
            <LeftMenu/>
            <MainContainer/>
            <RightMenu/>
        </div>
    );
}

export default Home;