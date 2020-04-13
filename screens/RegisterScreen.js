import React from 'react';
import {View, Text, StyleSheet, FlatList, CheckBox} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../constants/Colors';

import {CHEMICALS} from '../services/chemicalService'

const renderChemical = (itemData) => {
    return <View style={styles.items}>
            <CheckBox />
            <Text style={styles.item}>{itemData.item.name}</Text>
           </View>
}

const RegisterScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Cadastre os produtos quimicos da sua marca ou alimento.</Text>
            <FlatList  style={styles.list} data={CHEMICALS} renderItem={renderChemical} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen : {
       flex : 1,
       justifyContent : 'center',
       alignItems : 'center'
    },
    item : {
        fontFamily : 'open-sans',
        fontSize : 16,
        marginHorizontal : 15
    },
    items : {
        flexDirection : 'row',
        alignItems : 'center',
        flex : 1,
        marginVertical : 15,
        justifyContent : "flex-start"
    },
    list : {
        width: '80%',
    },
    text : {
        marginVertical : 10,
        fontFamily : 'open-sans-bold',
        fontSize: 16,
        textAlign : 'center'
    },
    checkbox : {
        
        
    }
});

export default RegisterScreen;