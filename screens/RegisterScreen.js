import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, TextInput, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';

import { CHEMICALS } from '../services/chemicalService'

const save = (navigation) => {
    console.log('saved !');
    navigation.navigate('Main');
}


const setCheck = (index, value, chemicalsCheck, setChemicallCheck) => {
    const updatedChecks = [...chemicalsCheck];
    updatedChecks[index] = value;
    setChemicallCheck(updatedChecks);
}

const Chemical = props => {
    return <View style={styles.items} key={props.id}>
                <Text style={styles.item}>{props.name}</Text>
                <Switch value={props.checked}
                    thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
                    trackColor={{ true: Colors.primaryColor }}
                    onValueChange={newValue => props.onChange(newValue)} />
            </View>
}

const RegisterScreen = props => {
    const [chemicalsCheck, setChemicallCheck] = useState(false);
    const [barcode, setBarcode] = useState('');
    const [brand, setBrand] = useState('');
    const [food, setFood] = useState('');

    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text style={styles.text}>Cadastre os produtos quimicos da sua marca ou alimento.</Text>
                <View style={styles.form}>
                    <View style={styles.formControl}>
                        <View style={styles.textContainer}>
                            <TextInput
                                style={styles.input}
                                value={barcode}
                                onChangeText={text => setBarcode(text)}
                                placeholder='Código de barra'
                                keyboardType='number-pad'
                            />
                            <TouchableOpacity>
                                <Ionicons
                                    name={Platform.OS === 'android' ? 'md-barcode' : 'ios-barcode'}
                                    size={23}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.formControl}>
                        <View style={styles.textContainer}>
                            <TextInput
                                style={styles.input}
                                value={food}
                                onChangeText={text => setFood(text)}
                                placeholder='Escolha o alimento'
                            />
                            <TouchableOpacity>
                                <Ionicons
                                    name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                                    size={23}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.formControl}>
                        <View style={styles.textContainer}>
                            <TextInput
                                style={styles.input}
                                value={brand}
                                onChangeText={text => setBrand(text)}
                                placeholder='Escolha a Marca'
                            />
                            <TouchableOpacity>
                                <Ionicons
                                    name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                                    size={23}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                {CHEMICALS.map(chemical => <Chemical name={chemical.name} id={chemical.id} />)}
            </View>
        </ScrollView>
    )
}

RegisterScreen.navigationOptions = navData => {
    return {
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName={
                        Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                    }
                    onPress={() => save(navData.navigation)}
                />
            </HeaderButtons>

    };
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        fontFamily: 'open-sans',
        fontSize: 16,
        marginHorizontal: 15
    },
    items: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginVertical: 15,
        marginRight: 20,
        justifyContent: "space-between",
        width: '80%',
    },
    list: {
        width: '100%',
    },
    text: {
        marginVertical: 10,
        fontFamily: 'open-sans-bold',
        fontSize: 14,
        textAlign: 'center'
    },
    textContainer: {
        flexDirection: 'row'
    },
    form: {
        margin: 20,
        width: '80%'
    },
    formControl: {
        width: '100%',
        marginBottom: 10
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: '90%',
        fontSize : 20,
        fontFamily: 'open-sans',
    }
});

export default RegisterScreen;