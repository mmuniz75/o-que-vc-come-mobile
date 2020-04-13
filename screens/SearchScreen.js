import React from 'react';
import {View, Text, StyleSheet, Button, FlatList} from 'react-native';

import {CHEMICALS} from '../services/chemicalService'
import { TouchableOpacity } from 'react-native-gesture-handler';

const renderChemical = (itemData) => {
    return (
    <TouchableOpacity onPress={() => {}}>
        <View style={styles.items}>
            <Text style={styles.item}>{itemData.item.name}</Text>
        </View>    
    </TouchableOpacity>            
    )        
}

const SearchScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Veja os produtos quimicos que acompanham os alimentos que você consome.</Text>
            <Button style={styles.button} title="Não achei meu alimento" onPress={() => {
                props.navigation.navigate('Register')}
            } />
            <FlatList style={styles.list} data={CHEMICALS} renderItem={renderChemical} />
      </View>
    )
}


const styles = StyleSheet.create({
    screen : {
       flex : 1,
       justifyContent : 'center',
       alignItems : 'center',
    },
    button : {
        margin : 100,
        padding: 100
    },
    item : {
        fontFamily : 'open-sans',
    },
    items : {
        flex : 1,
        margin : 15,
    },
    list : {
        width: '80%',
    },
    text : {
        marginVertical : 10,
        fontFamily : 'open-sans-bold',
        fontSize: 14,
        textAlign : 'center'
    }
});

export default SearchScreen;