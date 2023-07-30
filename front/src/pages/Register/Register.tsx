import React from "react";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import {Navigate, useNavigate} from "react-router-dom";
import { fetchRegister } from "../../redux/slices/ProfileSLice";

export const Registration: React.FC = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const userData = useSelector<any>((state) => state.ProfileSlice.data);
  const onSubmit = async (values) => {
    // @ts-ignore
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) return alert("Не удалось зарегистрироваться");

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  if (userData) {
    return <Navigate to="/" />;
  }
  return (
      <>
          <form onSubmit={handleSubmit(onSubmit)}>
              <input
                  type="text"
                  placeholder="name"
                  className={styles.field}
                  {...register("fullName", { required: "Укажите Имя" })}
              />
              <input
                  type="email"
                  className={styles.field}
                  placeholder="email"
                  {...register("email", { required: "Укажите почту" })}
              />
              <input
                  type="password"
                  placeholder="password"
                  className={styles.field}
                  {...register("password", { required: "Укажите пароль" })}
              />
              <button disabled={!isValid} type="submit">
                  Зарегистрироваться
              </button>
          </form>
          <button onClick={()=>navigate("/login")}>Войти</button>
      </>
  );
};
