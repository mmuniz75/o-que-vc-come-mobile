import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { CHEMICALS } from '../services/chemicalService'
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';

import Card from '../components/UI/Card';
import Autocomplete from 'react-native-autocomplete-input'


import { YellowBox } from 'react-native'


YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])


const Chemical = props => {
    return (
        <View style={styles.list}>
            <TouchableOpacity onPress={() => { }}>
                <View style={styles.items}>
                    <Text style={styles.item} key={props.id} >{props.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}




const SearchScreen = props => {
    const [barcode, setBarcode] = useState('');
    const [brand, setBrand] = useState('');
    const data = ['uva','maca', 'banana'];
    const [filter, setFilter] = useState([]);
    const [food, setFood] = useState();

    const selectFood= (value) => {
        setFood(value);
        if(value!="")
            setFilter(data.filter(food => food.toLowerCase().indexOf(value.toLowerCase())>-1))
        else
            setFilter([])    
    }

    const clickFood = (value) => {
        setFood(value)
        setFilter([])    
    }
    
    
    return (
        <ScrollView keyboardShouldPersistTaps="always">
            <View style={styles.screen}>
                <Text style={styles.text}>Veja os produtos quimicos que acompanham os alimentos que você consome.</Text>
                <View style={styles.form}>
                    <View style={styles.formControl}>
                        <View style={styles.textContainer}>
                            <TextInput
                                style={styles.input}
                                value={barcode}
                                onChangeText={text => setBarcode(text)}
                                keyboardType='number-pad'
                                placeholder='Codigo de barra'
                            />
                            <TouchableOpacity>
                                <Ionicons
                                    name={Platform.OS === 'android' ? 'md-barcode' : 'ios-barcode'}
                                    size={32}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                        <Autocomplete
                            data={filter}
                            keyExtractor={(item,index) => index.toString()}
                            inputContainerStyle={styles.autocompleteContainer}
                            listStyle={styles.listStyle}
                            renderTextInput= {() => (
                                <View style={styles.formControl}>
                                    <TextInput
                                        value={food}
                                        style={styles.input}
                                        placeholder='Escolha o alimento'
                                        onChangeText={text => selectFood(text)}
                                    />    
                                </View>    
                            )}
                            renderItem={({ item, i }) => (
                                <TouchableOpacity onPress={() => clickFood(item)}>
                                    <Text style={styles.input}> {item}</Text>
                                </TouchableOpacity>
                        )}
                        />
                    
                    {!food | true? null : (
                        <View style={styles.formControl}>
                            <TextInput
                                style={styles.input}
                                value={brand}
                                onChangeText={text => setBrand(text)}
                                placeholder='Escolha a Marca'
                            />
                        </View>
                    )}
                </View>
                <Button style={styles.button} title="Não achei meu alimento" onPress={() => {
                    props.navigation.navigate('Register')
                }
                } />
                
                {CHEMICALS.map(chemical => <Chemical name={chemical.name} key={chemical.id} />)}
                
            </View>
        </ScrollView>
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
        padding: 100,
        borderRadius: 20,
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
        marginVertical: 20,
        fontFamily: 'open-sans-bold',
        fontSize: 14,
        textAlign: 'center',
        color : Colors.primaryColor
    },
    textContainer: {
        flexDirection: 'row'
    },
    form: {
        margin: 20,
        width: '90%'
    },
    formControl: {
        width: '100%',
        marginBottom: 20
    },
    label: {
        fontFamily: 'open-sans-bold',
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: '90%',
        fontSize : 20,
        fontFamily: 'open-sans',
    },
    autocompleteContainer: {
        borderWidth: 0
      },
    listStyle: {
        marginTop: -20
    }
});

export default SearchScreen;