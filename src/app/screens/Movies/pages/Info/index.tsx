import React, {useRef} from 'react';
import PageWrapper from '../../../../components/PageWrapper';
import {Button, Divider, HStack, Icon, Text, VStack, View} from 'native-base';
import {ScreenProps} from '../../../../navigators/Application';
import axios from '../../../../utils/axios';
import {useQuery} from 'react-query';
import TMDBImage from '../../../../components/TMDBImage';
import {Dimensions, ImageBackground, StyleSheet} from 'react-native';
import {colors} from '../../../../theme/variables';
import {IMG_URL} from '@env';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import Casts from './components/Casts';
import YoutubePlayer from 'react-native-youtube-iframe';
import Carousel from 'react-native-snap-carousel';
import MovieCard from '../../../../components/Card';
import { useNavigation } from '@react-navigation/native';
import paths from '../../../../constants/routePaths';

const MovieInfo = ({route}: ScreenProps<"MovieInfo">) => {
    const {_id} = route.params;
    const {t} = useTranslation()
    const navigation = useNavigation()
    const carouselRef = useRef(null)
    const recommendationslRef = useRef(null)

    const fetchMovieDetails = async () => {
        const {data} = await axios.get(`/movie/${_id}`)
        return data
    }

    const fetchVideos = async () => {
        const {data} = await axios.get(`/movie/${_id}/videos`)
        return data?.results
    }

    const fetchRecommendations = async () => {
        const {data} = await axios.get(`/movie/${_id}/recommendations`)
        return data?.results
    }

    const {data} = useQuery('movie', fetchMovieDetails)
    const {data: videos} = useQuery('videos', fetchVideos)
    const {data: recommendations} = useQuery('recommendations', fetchRecommendations)

    const hour = Math.floor(data?.runtime / 60);
    const minute = data?.runtime % 60;

    const handleBack = () => {
        navigation.navigate(paths.HOME)
    }

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

    const renderVideo = ({item}: any) => (
        <YoutubePlayer
            key={item?.key}
            height={160}
            videoId={item?.key}
            onChangeState={() => {}}
        />
    )

    const renderRecommendation = ({ item }: any) => (
        <MovieCard
            mediaType={"movie"}
            key={item?.id}
            img={item?.poster_path}
            progress={item?.vote_average}
            title={item?.title}
            date={item?.release_date}
            id={item?.id} />
    )

    return (
        <>
            <ImageBackground blurRadius={3} source={{uri: IMG_URL + (data?.backdrop_path ?? data?.poster_path)}} style={styles.movieBgImage}>
                <View style={styles.movieInner}>
                    <Icon as={Feather} name="arrow-left" size="24px" color="lightGray.100" onPress={handleBack} />
                    <View style={styles.movieBlock}>
                        <TMDBImage uri={data?.poster_path ?? data?.backdrop_path} style={styles.movieImage} />
                        <View style={{flex: 1, gap: 5}}>
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
                </View>
            </ImageBackground>
            <PageWrapper style={styles.bodyInner} >
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
                {
                    videos?.length ? (
                        <>
                            <Text marginY="20px" fontSize="lg">{t('Videos')}</Text>
                            <Carousel
                                ref={carouselRef}
                                data={videos}
                                renderItem={renderVideo}
                                sliderWidth={Dimensions.get('window').width - 36}
                                itemWidth={260}
                                autoplay
                                autoplayInterval={30000}
                                loop
                            />
                        </>
                    ) : null
                }
                {data?.belongs_to_collection ? (
                        <View style={styles.collectionInner}>
                                <TMDBImage uri={data?.belongs_to_collection?.poster_path} style={styles.collectionImage} />
                                <View style={styles.collectionBlock}>
                                    <Text>{t(('Part of the'))} {data?.belongs_to_collection?.name}</Text>
                                    <Button variant="secondary" size="sm">{t('View Collection')}</Button>
                                </View>
                        </View>
                ) : null}
                <View style={styles.recommendationsInner}>
                    <Text marginBottom="20px" fontSize="lg">
                        {t('Recommendations')}
                    </Text>
                    <Carousel
                        ref={recommendationslRef}
                        data={recommendations}
                        renderItem={renderRecommendation}
                        sliderWidth={Dimensions.get('window').width - 36}
                        itemWidth={180}
                        autoplay
                        autoplayInterval={10000}
                        loop
                    />
                </View>
            </PageWrapper>
        </>
    )
}

const styles = StyleSheet.create({
    movieImage: {
        width: 140,
        height: 200,
        borderRadius: 16,
    },
    movieBgImage: {
        width: Dimensions.get('window').width,
        minHeight: 400,
    },
    movieInner: {
        flex: 1,
        paddingHorizontal: 18,
        paddingTop: 40,
        paddingBottom: 20,
        backgroundColor: colors.main[75],
    },
    movieBlock: {
        // flex: 1,
        marginTop: 40,
        gap: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bodyInner: {
        paddingVertical: 18,
        backgroundColor: colors.white[100],
        top: -40,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        flex: 1,
    },
    infoWrapper: {
        marginTop: 10,
        gap: 10,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    collectionInner: {
        gap: 15,
        margin: 10,
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
        elevation: 10,
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 1 },
        shadowColor: colors.shadow[100],
        backgroundColor: colors.white[100],
    },
    collectionImage: {
        width: 80, 
        height: 100, 
        borderRadius: 16
    },
    collectionBlock: {
        alignItems: 'flex-start',
        flex: 1,
        gap: 10
    },
    recommendationsInner: {
        paddingBottom: 40
    }
})

export default MovieInfo