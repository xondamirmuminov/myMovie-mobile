import { Text, View } from 'native-base'
import React from 'react'
import PageWrapper from '../../components/PageWrapper'
import { useQuery } from 'react-query'
import axios from '../../utils/axios'
import { Dimensions, ImageBackground, StyleSheet } from 'react-native'
import { IMG_URL } from '@env'
import { colors } from '../../theme/variables'

const Home = () => {
    const fetchTrendingMovie = async () => {
        const { data } = await axios.get('/trending/movie/day')
        return data?.results
    }

    const { data } = useQuery('trendings', fetchTrendingMovie)

    return (
        <>
            <ImageBackground source={{ uri: IMG_URL + (data[0]?.backdrop_path ?? data[0]?.poster_path) }} style={styles.trendingBgImage}>
                <View style={styles.trendingInner}>
                    <Text>{data[0]?.title}</Text>
                </View>
            </ImageBackground>
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
        paddingTop: 50,
        justifyContent: 'center',
        backgroundColor: colors.main[75]
    }
})

export default Home