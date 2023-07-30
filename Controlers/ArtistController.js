import Artist from "../models/Artist.js";

export const getAllArtist = async (req,res)=>{
    try{
        const Artists = await Artist.find().exec();
        res.json(Artists)
    }catch (e) {
        return res.status(404).json({
            message:"Ошибка при получении Артистов"
        })
    }
}

export const getOneArtist = async (req,res)=>{
    try{
        const ArtistId = req.params.id
        Artist.findOneAndUpdate({_id:ArtistId},{$inc:{viewArtist:1}},{returnDocument:'after'},(err,doc)=>{
            if(err){
                return res.status(404).json({
                    message:"Ошибка при получении Артиста"
                })
            }
            if(!doc){
                return res.status(404).json({
                    message:"Такого трека нет или он был удален"
                })
            }
            res.json(doc)
        })
    }catch (e) {
        return res.status(404).json({
            message:"Ошибка при получении трека"
        })

    }
}

export const createArtist = async (req,res)=>{
    try{
        const doc = new Artist({
            name:req.body.name,
            imgArtist:req.body.imgArtist,
            Musics:req.body.Musics,
        })
        const artist = await doc.save()
        res.json({
            message:"Успешно добавили Артиста",
            success:true,
            artist
        })
    }catch (e) {
        return res.status(404).json({
            success:false,
            message:"Ошибка при создании Артиста"

        })
    }
}

export const removeOneArtist = async (req,res)=>{
    try{
        const ArtistId = req.params.id
        Artist.findOneAndRemove({_id:ArtistId},(err,doc)=>{
            if(err){
                return res.status(404).json({
                    message:"Ошибка при удалении артиста"
                })
            }
            if(!doc){
                return res.status(404).json({
                    message:"Такого артиста нет или он был удален"
                })
            }
            res.json({
                message:"Успешно удален"
            })
        })
    }catch (e) {
        return res.status(404).json({
            message:"Ошибка при удалении артиста"
        })
    }
}

export const updateArtist = async (req,res)=>{
    try{
        const ArtistId = req.params.id
        await Artist.updateOne({
            _id:ArtistId
        },
            {
                name:req.body.name,
                imgArtist:req.body.imgArtist
            })
        res.json({
            success:true,
            message:"Успешно обновлены данные трека"
        })
    }catch (e) {
        return res.status(404).json({
            message:"ошибка при обновлении артиста"
        })
    }
}
