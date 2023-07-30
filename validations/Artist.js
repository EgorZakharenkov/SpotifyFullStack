import {body} from "express-validator";

export const ArtistValidation = [
    body('name',"имя не меньше 1 символа").isLength({min:1}).isString(),
    body('imgArtist',"Должна быть ссылка").isURL(),
]
