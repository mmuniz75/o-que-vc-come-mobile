import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SearchScreen = props => {
    return (
        <View style={styles.screen}>
        <Text>Veja os produtos quimicos que acompanham os alimentos que você consome.</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    screen : {
       flex : 1,
       justifyContent : 'center',
       alignItems : 'center',
       fontFamily : 'open-sans-bold'
    }
});

export default SearchScreen;