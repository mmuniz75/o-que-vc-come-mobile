import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { CHEMICALS } from '../services/chemicalService'
import foods from '../data/foods'
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';

import Chemical from '../components/UI/Chemical';
import Model from '../models/Model'
import Autocomplete from '../components/UI/AutoComplete'

import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

const SearchScreen = props => {
    const [barcode, setBarcode] = useState('');
    const [brand, setBrand] = useState('');
    const data = foods
    const [filter, setFilter] = useState([]);
    const [food, setFood] = useState({});
    
    const selectFood= (value) => {
        setFood(new Model(-1, value))
        if(value!="")
            setFilter(data.filter(food => food.name.toLowerCase().indexOf(value.toLowerCase())>-1))
        else
            setFilter([])    
    }

    const clickFood = (value) => {
        console.log(`escolhido alimento ${value.id}`)
        setFood(value)
        setFilter([])    
    }
    
    
    return (
        <ScrollView >
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
                    <View style={styles.formControl}>
                        <Autocomplete
                            data={filter}
                            value={food.name}
                            placeholder='Escolha o alimento'
                            onChangeText={text => selectFood(text)}
                            onPress={item => clickFood(item)}
                        />
                    </View>                    
                    {!food? null : (
                        <View style={styles.formControl}>
                            <TextInput
                                style={styles.input}
                                value={brand}
                                onChangeText={text => setBrand(text)}
                                placeholder='Escolha a Marca'
                            />
                        </View>
                    )}
                
                <Button style={styles.button} title="Não achei meu alimento" onPress={() => {
                    props.navigation.navigate('Register')
                }
                } />
                
                {CHEMICALS.map(chemical => <Chemical name={chemical.name} key={chemical.id} />)}
                </View>
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
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
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
        zIndex: 1000
    }
});

export default SearchScreen;