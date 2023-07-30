import React from "react";
import { signInWithGoogle } from "../../firebase";
import styles from "./style.module.css";
const Login: React.FC = (props) => {
  const changeLogin = () => {
    signInWithGoogle();
  };
  return (
    <div className={styles.block}>
      <span>Войти с помощью Google</span>
      <button onClick={() => changeLogin()}>Google</button>
    </div>
  );
};

export default Login;
