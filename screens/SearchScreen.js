import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';

import Chemical from '../components/UI/Chemical';
import Model from '../models/Model'
import Autocomplete from '../components/UI/AutoComplete'

import { CHEMICALS } from '../services/chemicalService'
import foodsData from '../data/foods'
import brandsData from '../data/brands'


import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

const SearchScreen = props => {
    const startObject = new Model(-1, "")
    const [barcode, setBarcode] = useState('');
    const [food, setFood] = useState(startObject);
    const [foods, setFoods] = useState([]);
    const [brand, setBrand] = useState(startObject);
    const [brands, setBrands] = useState([]);
    
    const selectFood= (value) => {
        setFood(new Model(-1, value))
        if(value!="")
            setFoods(foodsData.filter(food => food.name.toLowerCase().indexOf(value.toLowerCase())>-1))
        else
            setFoods([])    
    }

    const clickFood = (value) => {
        console.log(`escolhido alimento ${value.id}`)
        setFood(value)
        setFoods([])    
    }

    const selectBrand= (value) => {
        setBrand(new Model(-1, value))
        if(value!="")
            setBrands(brandsData.filter(brand => brand.name.toLowerCase().indexOf(value.toLowerCase())>-1))
        else
            setBrands([])    
    }

    const clickBrand = (value) => {
        console.log(`escolhido marca ${value.id}`)
        setBrand(value)
        setBrands([])    
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
                            data={foods}
                            value={food.name}
                            placeholder='Escolha o alimento'
                            onChangeText={text => selectFood(text)}
                            onPress={item => clickFood(item)}
                        />
                    </View>                    
                    {!food? null : (
                        <View style={styles.formControl}>
                            <Autocomplete
                                data={brands}
                                value={brand.name}
                                placeholder='Escolha o marca'
                                onChangeText={text => selectBrand(text)}
                                onPress={item => clickBrand(item)}
                            />
                        </View>
                    )}
                    {food.name == "" || brand.name == "" ? (
                                        <View style={styles.button}>
                                            <Button title="Não achei meu alimento" onPress={() => props.navigation.navigate('Register')} />
                                        </View>
                                        ):null}
                    
                
                {
                    food.id > 0 && brand.id > 0 ? CHEMICALS.map(chemical => <Chemical name={chemical.name} key={chemical.id} />) : null
                }
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
        marginTop : 1,
        padding: 10,
        borderRadius: 50,
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
    }
});

export default SearchScreen;