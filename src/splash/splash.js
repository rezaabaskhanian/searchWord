import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const Splash = ({ navigation }) => {
    const img = require('../assets/img/search.png')
    useEffect(() => {

        setTimeout(() => {
            navigation.navigate('Home')
        }, 3000);


    }, [])

    return (
        <View style={styles.container}>

            <Image source={img} style={{ width: 50, height: 50 }} />
            <Text style={{ fontFamily: 'iranSans', fontSize: 18, color: '#fff', marginTop: 20, }}>
                {`SearchWorld`}

            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#144185',
        justifyContent: 'center',
        alignItems: 'center'

    }
})

export default Splash