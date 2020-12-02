import React from 'react';
import { View, Text, StyleSheet,Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Chemical = props => {

    const openLink = name => {
        const google = `https://www.google.com/search?q=${name}`
        Linking.openURL(google)
        .catch((err) => 
            console.error('An error occurred', err)
        );
    }
        
    return (
        <View style={styles.list}>
            <TouchableOpacity onPress={() => openLink(props.name)}>
                <View style={styles.items}>
                    <Text style={styles.item} key={props.id} >{props.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
    list: {
        width: '100%',
    },
});

export default Chemical;