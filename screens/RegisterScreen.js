import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import {CHEMICALS} from '../services/chemicalService'

const renderChemical = (itemData) => {
    return <View style={styles.list}>
                <Text>{itemData.item.name}</Text>
            </View>
}

const RegisterScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Cadastre os produtos quimicos da sua marca ou alimento.</Text>
            <FlatList data={CHEMICALS} renderItem={renderChemical} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen : {
       flex : 1,
       justifyContent : 'center',
       alignItems : 'center'
    },
    list : {
        flex : 1,
        margin : 15,
        
    }
});

export default RegisterScreen;