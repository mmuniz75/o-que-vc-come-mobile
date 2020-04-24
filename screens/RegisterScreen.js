import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, TextInput, Platform, Dimensions, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';

import { CHEMICALS } from '../services/chemicalService'
import Card from '../components/UI/Card';

const save = (navigation) => {
    Alert.alert('Confirmação', 'Cadastrado realizado', [
        {
            text: 'OK',
            style: 'default',
            onPress: () => {
                navigation.navigate('Main');
            }
        }
    ]);
}

const add = (setModal) => {
    setModal(false);

}


const setCheck = (index, value, chemicalsCheck, setChemicallCheck) => {
    const updatedChecks = [...chemicalsCheck];
    updatedChecks[index] = value;
    setChemicallCheck(updatedChecks);
}

const Chemical = props => {
    return <View style={styles.items} >
        <Text style={styles.item}>{props.name}</Text>
        <Switch
            style={styles.switch}
            value={props.checked}
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

    const [showModal, setModal] = useState(false);

    return (
        <ScrollView>
            <Modal animationType='slide'
                visible={showModal}
                transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <View style={styles.formControl}>
                            <View style={styles.closeIcon}>
                                <TouchableOpacity>
                                    <Ionicons
                                        name={Platform.OS === 'android' ? 'md-close' : 'ios-close'}
                                        size={25}
                                        onPress={() => add(setModal)}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.label} >Digite o nome do item</Text>
                            <View style={styles.textContainer}>
                                <TextInput
                                    style={styles.input}
                                    value={food}
                                    onChangeText={text => setFood(text)}
                                />
                                <TouchableOpacity>
                                    <Ionicons
                                        name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                                        size={32}
                                        color='green'
                                        onPress={() => add(setModal)}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.screen}>
                <Text style={styles.text}>Cadastre os produtos quimicos da sua marca ou alimento.Caso não ache sua marca ou alimento aperte + para adiciona-los.</Text>
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
                                    size={32}
                                    onPress={() => { }}
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
                                    size={32}
                                    onPress={() => setModal(true)}
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
                                    size={32}
                                    onPress={() => setModal(true)}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={styles.list}>
                    <Text style={styles.textChemical}>Selecione os produtos quimicos desse alimento.</Text>
                    {CHEMICALS.map(chemical => <Chemical name={chemical.name} key={chemical.id} />)}
                </View>

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
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
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
        width: '100%',
    },
    list: {
        width: '95%',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 20
    },
    text: {
        marginTop: 20,
        fontFamily: 'open-sans-bold',
        fontSize: 14,
        textAlign: 'center',
        color : Colors.primaryColor
    },
    textChemical: {
        margin: 20,
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        textAlign: 'center',
        color : Colors.primaryColor
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
        marginVertical: 8,
        fontSize: 16,
        color : Colors.primaryColor
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: '90%',
        fontSize: 20,
        fontFamily: 'open-sans',
        marginRight: 10
    },
    switch: {
        marginEnd: Dimensions.get('window').width > 320 ? '10%' : 0
    },
    closeIcon : {
        alignItems : 'flex-end'
    }
});

export default RegisterScreen;