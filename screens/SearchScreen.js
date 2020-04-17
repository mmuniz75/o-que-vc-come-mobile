import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, Platform } from 'react-native';

import { CHEMICALS } from '../services/chemicalService'
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';

const renderChemical = (itemData) => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.touchable}>
            <TouchableCmp onPress={() => { }}>
                <View style={styles.items}>
                    <Text style={styles.item}>{itemData.item.name}</Text>
                </View>
            </TouchableCmp>
        </View>
    )
}

const SearchScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Veja os produtos quimicos que acompanham os alimentos que você consome.</Text>
            <Button style={styles.button} title="Não achei meu alimento" onPress={() => {
                props.navigation.navigate('Register')
            }
            } />
            <FlatList style={styles.list} data={CHEMICALS} renderItem={renderChemical} />
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        margin: 100,
        padding: 100
    },
    item: {
        fontFamily: 'open-sans',
        fontSize: 16,
    },
    items: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    list: {
        width: '100%',
    },
    text: {
        marginVertical: 10,
        fontFamily: 'open-sans-bold',
        fontSize: 14,
        textAlign: 'center'
    }
});

export default SearchScreen;