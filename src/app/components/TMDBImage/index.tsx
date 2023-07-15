import { IMG_URL } from '@env'
import { Image } from 'native-base'
import React from 'react'

interface IImageProps {
    uri: string;
    style?: any;
}

const TMDBImage = ({ uri, style }: IImageProps) => {
    return (
        <Image source={{ uri: IMG_URL + uri }} style={style ?? {}} alt="movie" />
    )
}

export default TMDBImage