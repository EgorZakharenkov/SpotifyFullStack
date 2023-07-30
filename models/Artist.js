import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imgArtist: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Artist", ArtistSchema);
