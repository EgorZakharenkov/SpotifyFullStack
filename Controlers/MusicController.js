import MusicModel from "../models/Music.js";
import User from "../models/User.js";
import UserModel from "../models/User.js";

export const getAll = async (req, res) => {
  try {
    const Musics = await MusicModel.find().populate("user").exec();
    res.json(Musics);
  } catch (e) {
    return res.status(404).json({
      message: "Ошибка при получении треков",
    });
  }
};
export const getTracksCurrentArtist = async (req, res) => {
  try {
    const ArtistName = req.params.artist;
    const Musics = await MusicModel.find({ artist: ArtistName })
      .populate("user")
      .exec();
    res.json(Musics);
  } catch (e) {
    return res.status(404).json({
      message: "Ошибка при получении треков артиста",
      success: false,
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const MusicId = req.params.id;
    MusicModel.findOneAndUpdate(
      { _id: MusicId },
      { $inc: { viewSong: 1 } },
      { returnDocument: "after" },
      (err, doc) => {
        if (err) {
          return res.status(404).json({
            message: "Ошибка при получении трека",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Такого трека нет или он был удален",
          });
        }
        res.json(doc);
      }
    );
  } catch (e) {
    return res.status(404).json({
      message: "Ошибка при получении трека",
    });
  }
};
export const create = async (req, res) => {
  try {
    const doc = new MusicModel({
      songName: req.body.songName,
      artist: req.body.artist,
      song: req.body.song,
      imgSong: req.body.imgSong,
      textSong: req.body.textSong,
      user: req.userId,
      viewSong:req.body.viewSong,
      favorite: req.body.favorite,
      duration:req.body.duration,
    });

    const music = await doc.save();

    res.json({
      success: true,
      message: "Успешно добавили новый трек",
      music,
    });
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: "Ошибка",
    });
  }
};
export const removeOne = async (req, res) => {
  try {
    const MusicId = req.params.id;
    MusicModel.findOneAndRemove({ _id: MusicId }, (err, doc) => {
      if (err) {
        return res.status(404).json({
          message: "Ошибка при удалении трека",
        });
      }
      if (!doc) {
        return res.status(404).json({
          message: "Такого трека нет или он был удален",
        });
      }
      res.json({
        message: "Успешно удален",
      });
    });
  } catch (e) {
    return res.status(404).json({
      message: "Ошибка при удалении трека",
    });
  }
};

export const update = async (req, res) => {
  try {
    const MusicId = req.params.id;
    await MusicModel.updateOne(
      {
        _id: MusicId,
      },
      {
        songName: req.body.songName,
        artist: req.body.artist,
        song: req.body.song,
        imgSong: req.body.imgSong,
        textSong: req.body.textSong,
        user: req.userId,
        number: req.body.number,
        favorite: req.body.favorite,
      }
    );
    res.json({
      success: true,
      message: "Успешно обновлены данные трека",
    });
  } catch (e) {
    return res.status(404).json({
      message: "ошибка при обновлении трека",
    });
  }
};

export const updateFavorite = async (req, res) => {
  try {
    const MusicId = req.params.id;
    const track = await MusicModel.findOne({ _id: MusicId });
    const user = await UserModel.findById(req.userId);
    const { passwordHash, ...userData } = user._doc;
    let mas = userData.FavoriteTracks;
    mas.unshift(track);


    await User.updateOne({ _id: req.userId }, { FavoriteTracks: mas });

    res.json({
      message: "Успешно добавили в фавориты",
    });
  } catch (e) {
    return res.status(404).json({
      message: "Нихуя малыш",
    });
  }
};
export const removeFavorite = async (req, res) => {
  try {
    const MusicId = req.params.id;
    const track = await MusicModel.findOne({ _id: MusicId });
    const user = await UserModel.findById(req.userId);
    const { passwordHash, ...userData } = user._doc;
    let mas = userData.FavoriteTracks;
    mas = mas.filter((item)=> {
      return String(item._id) !== String(MusicId)
    })
    await User.updateOne({ _id: req.userId }, { FavoriteTracks: mas });


    res.json({
      message: "Успешно удалили из избранного",
      MusicId,
      mas

    });
  } catch (e) {
    return res.status(404).json({
      message: "Нихуя малыш",
    });
  }
};

export const AllFavoriteMusics = async (req, res) => {
  try {
    const user = await UserModel.findById({_id:req.userId})
    if(user){
      const { passwordHash, ...userData } = user._doc;

      res.json(userData.FavoriteTracks)
    }
  } catch (e) {
    return res.status(404).json({
      message: "Ошибка при получении избранных треков",
      success: false,
    });
  }
};
