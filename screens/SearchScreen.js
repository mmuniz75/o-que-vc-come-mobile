import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useSelector, useDispatch } from 'react-redux';

import Colors from '../constants/Colors';

import Chemical from '../components/UI/Chemical';
import Model from '../models/Model'
import Autocomplete from '../components/UI/AutoComplete'

import * as actions from '../store/actions'


import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

const SearchScreen = props => {
    const foodsData = useSelector(state => state.foods);
    let brandsData = useSelector(state => state.brands);
    let chemicalsRoot = useSelector(state => state.chemicals);
    let barCodeSet = useSelector(state => state.barcode);

    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(actions.fetchFoods());
    }, [dispatch]);

    useEffect(() => {
        setBarcode(chemicalsRoot.bar_code)
    }, [chemicalsRoot]);

    useEffect(() => {
        if(barCodeSet.brandId && brandsData){
            const brand = brandsData.find(b => b.id == barCodeSet.brandId)
            if (brand)
                clickBrand(brand)
        }
            
    }, [brandsData]);

    useEffect(() => {
        if(!foods)
            return
        
        const food = foodsData.find(f => f.id == barCodeSet.foodId)
        clickFood(food, false)
    }, [ barCodeSet]);

    const startObject = new Model(-1, "")
    const [barcode, setBarcode] = useState('');
    const [food, setFood] = useState(startObject);
    const [foods, setFoods] = useState([]);
    const [brand, setBrand] = useState(startObject);
    const [brands, setBrands] = useState([]);

    const seekFromBarcode = (value) => {
        setBrand("")
        setFood("")
        setBarcode(value)
        if (value.length < 13)
            return
        
        dispatch(actions.getFromBarcode(value))    
    }
    
    const selectFood= (value) => {
        setFood(new Model(-1, value))
        if(value!="")
            setFoods(foodsData.filter(food => food.name.toLowerCase().indexOf(value.toLowerCase())>-1))
        else
            setFoods([])    
    }

    const clickFood = (value, clean) => {
        setFood(value)
        setFoods([])    
        if(clean) {
            setBrand("")
            setBarcode("")
        }    
        dispatch(actions.getBrands(value.id));
    }

    const selectBrand= (value) => {
        setBrand(new Model(-1, value))
        if(value!="")
            setBrands(brandsData.filter(brand => brand.name.toLowerCase().indexOf(value.toLowerCase())>-1))
        else
            setBrands([])    
    }

    const clickBrand = (value) => {
        setBrand(value)
        setBrands([]) 
        dispatch(actions.getChemcals(food.id, value.id));   
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
                                onChangeText={text => seekFromBarcode(text)}
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
                            onPress={item => clickFood(item, true)}
                        />
                    </View>                    
                    {food.name !="" && (
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
                    food.id > 0 && brand.id > 0 && chemicalsRoot.chemicals
                    ? chemicalsRoot.chemicals.map(chemical => <Chemical key={chemical} name={chemical} />) 
                    : null
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