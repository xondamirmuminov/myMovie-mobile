import { IMG_URL } from '@env'
import { Image } from 'native-base'
import React from 'react'
import DefaultImage from '../../../assets/images/default-placeholder.png'

interface IImageProps {
    uri: string;
    style?: any;
}

const TMDBImage = ({ uri, style }: IImageProps) => {
    return (
        <Image source={uri ? { uri: IMG_URL + uri } : DefaultImage} style={style ?? {}} alt="movie" />
    )
}

export default TMDBImage