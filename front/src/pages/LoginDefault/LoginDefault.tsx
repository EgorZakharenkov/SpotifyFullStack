import React from "react";

import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import {Navigate, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {fetchUserData, ProfileSLice, UserData} from "../../redux/slices/ProfileSLice";
import {RootState} from "../../redux/store";

export const LoginDefault: React.FC = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const userData = useSelector<RootState,UserData>((state) => state.ProfileSlice.data);

  const onSubmit = async (values) => {
    // @ts-ignore
    const data = await dispatch(fetchUserData(values));
    if (!data.payload) return alert("Не удалось авторизоваться");

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      window.location.reload()


    }
  };

  if (userData) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.field}
        type="email"
        placeholder="email"
        {...register("email", { required: "Укажите почту" })}
      />
      <input
        className={styles.field}
        type="password"
        placeholder="password"
        {...register("password", { required: "Укажите пароль" })}
      />
      <button disabled={!isValid} type="submit">
        Войти
      </button>
    </form>
  );
};
