import {body} from "express-validator";

export const MusicValidation = [
    body('songName',"название не меньше 1 символа").isLength({min:1}).isString(),
    body('artist',"Имя артиста не менее 1").isLength({min:1}).isString(),
    body('song',"Должна быть ссылка").isString(),
    body('imgSong',"Должна быть ссылка").isURL(),
    body("textSong",'Текста трека должен быть не менее одного символа').optional().isLength({min:1}).isString(),
    body("favorite","Должно быть или true ли false").isBoolean(),
    body("duration","Должна быть строка").isString()
]