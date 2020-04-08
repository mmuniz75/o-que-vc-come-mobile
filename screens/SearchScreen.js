import React from 'react';
import {View, Text, StyleSheet, Button, FlatList} from 'react-native';

import {CHEMICALS} from '../services/chemicalService'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

const renderChemical = (itemData) => {
    return (
    <TouchableOpacity onPress={() => {}}>
        <View style={styles.list}>
            <Text>{itemData.item.name}</Text>
        </View>
    </TouchableOpacity>            
    )        
}

const SearchScreen = props => {
    return (
        <View style={styles.screen}>
        <Text>Veja os produtos quimicos que acompanham os alimentos que você consome.</Text>
        <Button title="Não achei meu alimento2" onPress={() => {
            props.navigation.navigate('Register')}
        } />
         <FlatList data={CHEMICALS} renderItem={renderChemical} />
      </View>
    )
}


SearchScreen.navigationOptions = data => {
    //console.log(data)
}

const styles = StyleSheet.create({
    screen : {
       flex : 1,
       justifyContent : 'center',
       alignItems : 'center',
       fontFamily : 'open-sans-bold'
    },
    list : {
        flex : 1,
        margin : 15,
        
    }
});

export default SearchScreen;