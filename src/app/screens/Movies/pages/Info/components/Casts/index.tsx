import { HStack, Icon, Text } from 'native-base'
import React from 'react'
import axios from '../../../../../../utils/axios'
import CastCard from './Card'
import { FlatList, Pressable, View } from 'react-native'
import { useQuery } from 'react-query'
import Feather from 'react-native-vector-icons/Feather'

interface ICastsProps {
    _id: string
}

const Casts = ({ _id }: ICastsProps) => {
    const fetchCastsByMovie = async () => {
        const { data } = await axios.get(`/movie/${_id}/credits`)
        return data
    }

    const { data } = useQuery('casts', fetchCastsByMovie)

    const renderItem = ({ item }) => (
        <CastCard
            key={item?.id}
            cast={item}
            style={{ marginRight: 20 }}
        />
    )

    const popularCredits = data?.cast?.slice(0, 9)

    return (
        <View>
            <Text fontSize="lg" marginTop="20px" marginBottom="10px">Casts</Text>
            <FlatList renderItem={renderItem} data={popularCredits} horizontal ListFooterComponentStyle={{ flexDirection: 'row', alignItems: 'center' }} ListFooterComponent={
                <Pressable>
                    <HStack alignItems="center" space="5px" paddingRight="10px">
                        <Text color="darkGray.100">View</Text>
                        <Icon as={Feather} name="arrow-right" color="darkGray.100" />
                    </HStack>
                </Pressable>
            } />
        </View>
    )
}

export default Casts