import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import TMDBImage from '../TMDBImage'
import { Divider, HStack, Icon, Text } from 'native-base';
import Feather from 'react-native-vector-icons/Feather'
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import paths from '../../constants/routePaths';

interface IMovieCard {
    img: string;
    title: string;
    date: string;
    progress: number;
    id: string;
    mediaType: string;
}

const MovieCard = ({ img, title, date, progress, id, mediaType }: IMovieCard) => {
    const navigation = useNavigation()

    const handleNavigate = () => {
        navigation.navigate(paths.MOVIE_INFO as never, { _id: id } as never)
    }

    return (
        <Pressable style={styles.card} onPress={handleNavigate}>
            <TMDBImage uri={img} style={styles.cardImage} />
            <Text fontSize="lg" noOfLines={1}>{title}</Text>
            <HStack alignItems="center">
                <HStack alignItems="center" space="5px">
                    <Icon as={Feather} name="star" size="18px" color="yellow.100" />
                    <Text size="sm" color="darkGray.100" fontWeight="500">{progress.toFixed(1)}</Text>
                </HStack>
                <Divider bg="darkGray.100" marginX="8px" orientation="vertical" />
                <Text color="darkGray.100">{moment(date).format('YYYY')}</Text>
            </HStack>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        gap: 2
    },
    cardImage: {
        height: 240,
        borderRadius: 16
    }
})

export default MovieCard