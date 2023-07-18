import React from 'react'
import PageWrapper from '../../../../components/PageWrapper'
import { Divider, HStack, Icon, Text, View } from 'native-base'
import { ScreenProps } from '../../../../navigators/Application';
import axios from '../../../../utils/axios';
import { useQuery } from 'react-query';
import TMDBImage from '../../../../components/TMDBImage';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import { colors } from '../../../../theme/variables';
import { IMG_URL } from '@env';
import Feather from 'react-native-vector-icons/Feather'
import moment from 'moment';

const MovieInfo = ({ route }: ScreenProps<"MovieInfo">) => {
    const { _id } = route.params;

    const fetchMovieDetails = async () => {
        const { data } = await axios.get(`/movie/${_id}`)
        return data
    }

    const { data } = useQuery('movie', fetchMovieDetails)

    return (
        <>
            <ImageBackground blurRadius={3} source={{ uri: IMG_URL + (data?.backdrop_path ?? data?.poster_path) }} style={styles.movieBgImage}>
                <View style={styles.movieInner}>
                    <TMDBImage uri={data?.poster_path ?? data?.backdrop_path} style={styles.movieImage} />
                    <View style={{ flex: 1 }}>
                        <Text color="white.100" fontSize="xl" fontWeight="500" noOfLines={2}>{data?.title}</Text>
                        <HStack alignItems="center" space="5px">
                            <Icon as={Feather} name="star" size="20px" color="yellow.100" />
                            <Text color="lightGray.100" fontWeight="500">{data?.vote_average?.toFixed(1)}</Text>
                            <Divider bg="lightGray.100" marginX="8px" orientation="vertical" />
                            <Text color="lightGray.100">{moment(data?.release_date).format('DD/MM/YYYY')}</Text>
                        </HStack>
                        <HStack alignItems="center" flexWrap="wrap" >
                            {
                                data?.genres?.map((genre, index) => (
                                    <>
                                        <Text fontSize="sm" color="gray.300" fontWeight="500" key={genre?.id}>
                                            {genre?.name}
                                            {data?.genres?.length - 1 === index ? '' : ', '}
                                        </Text>
                                    </>
                                ))
                            }
                        </HStack>
                    </View>
                </View>
            </ImageBackground>
            {/* <PageWrapper>
                <HStack>
                    <TMDBImage uri={data?.poster_path ?? data?.backdrop_path} style={styles.movieImage} />
                    <Text>{data?.title}</Text>
                </HStack>
            </PageWrapper> */}
        </>
    )
}

const styles = StyleSheet.create({
    movieImage: {
        width: 160,
        height: 220,
        borderRadius: 16
    },
    movieBgImage: {
        width: Dimensions.get('window').width,
        minHeight: 400
    },
    movieInner: {
        flex: 1,
        paddingHorizontal: 18,
        paddingTop: 40,
        paddingBottom: 20,
        gap: 25,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.main[75]
    }
})

export default MovieInfo