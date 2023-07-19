import React, { useEffect } from 'react'
import PageWrapper from '../../../../components/PageWrapper'
import { Divider, HStack, Icon, Text, VStack, View } from 'native-base'
import { ScreenProps } from '../../../../navigators/Application';
import axios from '../../../../utils/axios';
import { useQuery } from 'react-query';
import TMDBImage from '../../../../components/TMDBImage';
import { Dimensions, FlatList, ImageBackground, StyleSheet } from 'react-native';
import { colors } from '../../../../theme/variables';
import { IMG_URL } from '@env';
import Feather from 'react-native-vector-icons/Feather'
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Casts from './components/Casts';
import YouTube from 'react-native-youtube';

const MovieInfo = ({ route }: ScreenProps<"MovieInfo">) => {
    const { _id } = route.params;
    const { t } = useTranslation()

    const fetchMovieDetails = async () => {
        const { data } = await axios.get(`/movie/${_id}`)
        return data
    }

    const fetchVideos = async () => {
        const { data } = await axios.get(`/movie/${_id}/videos`)
        return data?.results
    }

    const { data } = useQuery('movie', fetchMovieDetails)
    const { data: videos } = useQuery('videos', fetchVideos)

    const hour = Math.floor(data?.runtime / 60);
    const minute = data?.runtime % 60;

    const movieInfo = [{
        label: 'Status',
        value: data?.status
    },
    {
        label: 'Original Language',
        value: data?.original_language?.toUpperCase()
    },
    {
        label: 'Budget',
        value: `$ ${data?.budget?.toLocaleString()}`
    },
    {
        label: 'Revenue',
        value: `$ ${data?.revenue?.toLocaleString()}`
    }]

    return (
        <>
            <ImageBackground blurRadius={3} source={{ uri: IMG_URL + (data?.backdrop_path ?? data?.poster_path) }} style={styles.movieBgImage}>
                <View style={styles.movieInner}>
                    <TMDBImage uri={data?.poster_path ?? data?.backdrop_path} style={styles.movieImage} />
                    <View style={{ flex: 1, gap: 5 }}>
                        <Text color="white.100" fontSize="xl" fontWeight="500">{data?.title}</Text>
                        <HStack alignItems="center" space="5px">
                            <Icon as={Feather} name="star" size="20px" color="yellow.100" />
                            <Text color="lightGray.100" fontWeight="500">{data?.vote_average?.toFixed(1)}</Text>
                            <Divider bg="lightGray.100" marginX="4px" orientation="vertical" />
                            <Text color="lightGray.100">{moment(data?.release_date).format('DD/MM/YYYY')}</Text>
                        </HStack>
                        <HStack alignItems="center" flexWrap="wrap">
                            {
                                data?.genres?.map((genre: any, index: number) => (
                                    <>
                                        <Text fontSize="sm" color="gray.300" fontWeight="500" key={genre?.id}>
                                            {genre?.name}
                                            {data?.genres?.length - 1 === index ? '' : ', '}
                                        </Text>
                                    </>
                                ))
                            }
                        </HStack>
                        <Text color="lightGray.100">{`${hour}h ${minute}m`}</Text>
                    </View>
                </View>
            </ImageBackground>
            <PageWrapper style={styles.bodyInner}>
                <VStack space="5px">
                    <Text color="gray.700">{t('Overview')}</Text>
                    <Text fontSize="sm">{data?.overview}</Text>
                </VStack>
                <Casts _id={_id} />
                <Text marginTop="20px" fontSize="lg">{t('More Info')}</Text>
                <View style={styles.infoWrapper}>
                    {
                        movieInfo.map((info: any) => (
                            <View style={styles.infoItem}>
                                <Text flex="1" color="gray.500">{info?.label}</Text>
                                <Text flex="1">{info?.value}</Text>
                            </View>
                        ))
                    }
                </View>
                <View>
                    <Text>{t('Videos')}</Text>
                    {/* <FlatList data={videos} horizontal renderItem={({ item: video }: any) => (
                        <YouTube
                            key={video?.id}
                            videoId={video?.key}
                            fullscreen
                            loop
                            // onReady={() => { }}
                            // onChangeState={() => { }}
                            // onChangeQuality={() => { }}
                            // onError={() => { }}
                            style={{ alignSelf: 'stretch', height: 300 }}
                        />
                    )} /> */}
                </View>
            </PageWrapper>
        </>
    )
}

const styles = StyleSheet.create({
    movieImage: {
        width: 140,
        height: 200,
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
    },
    bodyInner: {
        paddingVertical: 18,
        backgroundColor: colors.white[100],
        top: -40,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        flex: 1
    },
    infoWrapper: {
        marginTop: 10,
        gap: 10
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default MovieInfo