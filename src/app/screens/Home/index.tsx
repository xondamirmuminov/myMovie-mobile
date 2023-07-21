import { Button, Text, VStack, View } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import PageWrapper from '../../components/PageWrapper'
import { useQuery } from 'react-query'
import axios from '../../utils/axios'
import { Dimensions, ImageBackground, StyleSheet } from 'react-native'
import { IMG_URL } from '@env'
import { colors } from '../../theme/variables'
import { useTranslation } from 'react-i18next'
import Carousel from 'react-native-snap-carousel'
import MovieCard from '../../components/Card'
import { useNavigation } from '@react-navigation/native'
import paths from '../../constants/routePaths'

const Home = () => {
    const { t } = useTranslation()
    const navigation = useNavigation()
    const carouselRef = useRef(null)
    const [trendings, setTrendings] = useState<any>([])

    const fetchTrendingMovie = async () => {
        const { data } = await axios.get('/trending/movie/day')
        setTrendings(data?.results)
    }

    const handleNavigate = () => {
        navigation.navigate(paths.MOVIE_INFO as never, { _id: trendings[0]?.id } as never)
    }

    useEffect(() => {
        fetchTrendingMovie()
    }, [])

    const renderItem = ({ item }) => (
        <MovieCard mediaType={"movie"}
            key={item?.id}
            movie={item}
        />
    )

    return (
        <>
        <PageWrapper paddingH={0}>
            <ImageBackground blurRadius={3} source={{ uri: IMG_URL + (trendings[0]?.backdrop_path ?? trendings[0]?.poster_path) }} style={styles.trendingBgImage}>
                <View style={styles.trendingInner}>
                    <Text color="white.100" size="5xl" fontWeight="600" noOfLines={1}>{trendings[0]?.title}</Text>
                    <Text color="white.100" color="gray.200" noOfLines={3} fontWeight="500">{trendings[0]?.overview}</Text>
                    <Button width="130px" marginTop="15px" onPress={handleNavigate}>{t('View')}</Button>
                </View>
            </ImageBackground>
            <View style={{paddingHorizontal: 18}}>
                <VStack space="20px" marginTop="20px">
                    <Text fontSize="xl">{t("What's Popular?")}</Text>
                    <Carousel
                        ref={carouselRef}
                        data={trendings}
                        renderItem={renderItem}
                        sliderWidth={Dimensions.get('window').width - 36}
                        itemWidth={180}
                        autoplay
                        autoplayInterval={10000}
                        loop
                    />
                </VStack>
            </View>
        </PageWrapper>
        </>
    )
}

const styles = StyleSheet.create({
    trendingBgImage: {
        width: Dimensions.get('window').width,
        height: 400,
    },
    trendingInner: {
        flex: 1,
        paddingHorizontal: 18,
        paddingTop: 40,
        justifyContent: 'center',
        gap: 10,
        backgroundColor: colors.main[75]
    }
})

export default Home