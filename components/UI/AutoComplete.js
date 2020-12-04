import React from 'react'

import { View, Text, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Autocomplete from 'react-native-autocomplete-input'

const autComp = props => {

    const scrollBotton = (scrollRef) => {
        scrollRef.current.scrollTo({
            y: (100),
            animated: true,
        })
        
    }

    return <Autocomplete
                    data={props.data}
                    keyExtractor={(item,index) => index.toString()}
                    inputContainerStyle={styles.autocompleteContainer}
                    listStyle={styles.listStyle}
                    containerStyle={styles.containerStyle}
                    renderTextInput= {() => (
                            <TextInput
                                value={props.value}
                                style={styles.input}
                                placeholder={props.placeholder}
                                onChangeText={text => props.onChangeText(text)}
                                onFocus={() => scrollBotton(props.scrollRef)}
                            />    
                    )}
                    renderItem={({ item, i }) => (
                        <TouchableOpacity onPress={() => props.onPress(item)}> 
                            <Text style={styles.input}> {item.name}</Text>
                        </TouchableOpacity>
                    )}
            />
           
}                    

export default autComp;

const styles = StyleSheet.create({
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: '98%',
        fontSize : 20,
        fontFamily: 'open-sans',
    },
    autocompleteContainer: {
        borderWidth: 0,
        width: '98%'
      },
    listStyle: {
        zIndex: 1000,
        width: '98%'
    },
    containerStyle: {
        borderWidth: 0, 
        zIndex: 1,
        width: '98%'
    }
});