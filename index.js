import express from "express";
import mongoose from "mongoose";
import { loginValidation, registerValidation } from "./validations/auth.js";
import { MusicValidation } from "./validations/Music.js";
import chekAuth from "./utils/checkAuth.js";
import { AuthMe, login, register } from "./Controlers/UserController.js";
import {
  AllFavoriteMusics,
  create,
  getAll,
  getOne,
  getTracksCurrentArtist,
  removeFavorite,
  removeOne,
  update,
  updateFavorite,
} from "./Controlers/MusicController.js";
import { ArtistValidation } from "./validations/Artist.js";
import {
  createArtist,
  getAllArtist,
  getOneArtist,
  removeOneArtist,
  updateArtist,
} from "./Controlers/ArtistController.js";
import cors from "cors";
mongoose
  .connect(
    "mongodb+srv://admin:wwwwww@spotify.tcdxe7a.mongodb.net/spotify?retryWrites=true&w=majority"
  )
  .then(() => console.log("db ok......"))
  .catch((err) => console.log("db no.....", err));

const app = express();
app.use(express.json());
app.use(cors());

//Register and Login

app.post("/auth/register", registerValidation, register);
app.post("/auth/login", loginValidation, login);
app.get("/auth/me", chekAuth, AuthMe);

//Musics
app.get("/music", getAll);
app.get("/music/:id", getOne) *
app.post("/music", chekAuth,  create);
app.delete("/music/:id", chekAuth, removeOne);
app.put("/music/:id", chekAuth, MusicValidation, update);
app.put("/music/favorite/:id", chekAuth, updateFavorite);
app.put("/music/deleteFaforite/:id",chekAuth, removeFavorite);
app.get("/favoriteMusic",chekAuth, AllFavoriteMusics);
app.get("/artistMusic/:artist", getTracksCurrentArtist);

//Artists

app.get("/artist", getAllArtist);
app.get("/artist/:id", getOneArtist);
app.post("/artist", chekAuth, ArtistValidation, createArtist);
app.delete("/artist/:id", chekAuth, removeOneArtist);
app.put("/artist/:id", chekAuth, ArtistValidation, updateArtist);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  } else {
    console.log("Server ok");
  }
});
