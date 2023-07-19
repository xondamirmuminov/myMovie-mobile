import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import TMDBImage from '../../../../../../../components/TMDBImage'
import { Text } from 'native-base'

interface ICastCard {
    cast: any,
    style?: any
}

const CastCard = ({ cast, style }: ICastCard) => {
    return (
        <Pressable style={[styles.cardInner, style]}>
            <TMDBImage uri={cast?.profile_path} style={styles.castImg} />
            <View style={styles.castBlock}>
                <Text fontSize="sm" fontWeight="500" noOfLines={1}>{cast?.name}</Text>
                <Text fontSize="sm" color="darkGray.100" noOfLines={1}>{cast?.character}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cardInner: {
        maxWidth: 210,
        minWidth: 210,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    castBlock: {
        flex: 1
    },
    castImg: {
        width: 60,
        height: 60,
        borderRadius: 50
    }
})

export default CastCard