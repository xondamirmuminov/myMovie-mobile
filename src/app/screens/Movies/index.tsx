import React, {useState} from 'react'
import PageWrapper from '../../components/PageWrapper'
import SearchInput from '../../components/Inputs/Search'
import {useQuery} from 'react-query';
import MovieCard from '../../components/Card';
import {Dimensions, StyleSheet} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import axios from '../../utils/axios';

const Movies = () => {
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1)

    const fetchMovies = async () => {
        const { data } = await axios.get('/movie/popular')
        return data?.results
    }

    const {data} = useQuery('movies', fetchMovies)

    const renderMovie = ({ item }: any) => (
        <MovieCard movie={item} mediaType='movie' />
    )

    return (
        <PageWrapper>
            <SearchInput flex={1} onChange={setSearch}/>
            <FlashList
                data={data}
                onEndReachedThreshold={1}
                // onEndReached={handleOnEndReached}
                renderItem={renderMovie}
                numColumns={2}
                estimatedItemSize={190}
                keyExtractor={(item: any) => item?.id}
                removeClippedSubviews={true}
                estimatedListSize={{
                    height: 280,
                    width: Dimensions.get('window').width / 2 - 56,
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.inner}
             />
        </PageWrapper>
    )
}

const styles = StyleSheet.create({
    inner: {
        padding: 18,
        paddingTop: 20,
        paddingBottom: 250,
    },
})

export default Movies