import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, TextInput, Platform, Dimensions, Modal, Alert,KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import * as actions from '../store/actions'
import Autocomplete from '../components/UI/AutoComplete'
import Model from '../models/Model'

import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

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
    const startObject = new Model(-1, "")
    
    const [showModal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [chemicalsCheck, setChemicallCheck] = useState(false);
    
    const [barcode, setBarcode] = useState('');
    const [brand, setBrand] = useState(startObject);
    const [food, setFood] = useState(startObject);
    
    const [brands, setBrands] = useState([]);
    const [foods, setFoods] = useState([]);
    
    const chemicals = useSelector(state => state.all_chemicals);
    const allBrands = useSelector(state => state.all_brands);
    const allFoods = useSelector(state => state.foods);

    const dispatch = useDispatch();
    
    const loadChemicals = useCallback(async () => {
        try{
            if(chemicals.length > 0)
                return;
            await dispatch(actions.fetchChemicals());
            console.log("chemicals LOADED !")
        }catch(err){
            Alert.alert('Mensagem', err.message, [{ text: 'Fechar' }]);
        }  
    }, []);

    const loadBrands = useCallback(async () => {
        try{
            if(allBrands.length > 0)
                return;
            await dispatch(actions.fetchBrands());
            console.log("brands LOADED !")
        }catch(err){
            Alert.alert('Mensagem', err.message, [{ text: 'Fechar' }]);
        }  
    }, []);

    useEffect(() => {
        setIsLoading(true);
        loadChemicals()
        .then(() => loadBrands())
        .then(() => {
            setIsLoading(false);
        });
      }, [dispatch]);

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

    const checkBarcode = async (value) => {
        setBarcode(value)
        if (value.length < 13)
            return
        
        setIsLoading(true);
        try{
            await dispatch(actions.getFromBarcode(value))    
            Alert.alert('Mensagem', 'Código de barras já cadastrado', [{ text: 'Fechar' }]);
            setBarcode('')
        }catch(err){
            if(err.message != "Codigo de barra não encontrado"){
                Alert.alert('Mensagem', err.message, [{ text: 'Fechar' }]);
                setBarcode('')
            }    
        }    
        setIsLoading(false);
    }

    const selectFood= (value) => {
        setFood(new Model(-1, value))
        if(value!="")
            setFoods(allFoods.filter(food => food.name.toLowerCase().indexOf(value.toLowerCase())>-1))
        else
            setFoods([])    
    }

    const clickFood = async (value) => {
        setFood(value)
        setFoods([])    
        await checkDuplicate(value.id, -1);
    }

    const selectBrand= (value) => {
        setBrand(new Model(-1, value))
        if(value!="")
            setBrands(allBrands.filter(brand => brand.name.toLowerCase().indexOf(value.toLowerCase())>-1))
        else
            setBrands([])    
    }

    const clickBrand = async (value) => {
        setBrand(value)
        setBrands([]) 
        await checkDuplicate(-1, value.id);
    }

    const checkDuplicate = async(foodId, brandId) => { 
        foodId = foodId > -1 ? foodId : food.id
        brandId = brandId > -1 ? brandId : brand.id
        if (foodId > -1 && brandId > -1) {
            try{
                await dispatch(actions.getChemcals(foodId, brandId));   
                setFood(new Model(-1, ""))
                setBrand(new Model(-1, ""))
                Alert.alert('Mensagem', 'Alimento e marca já cadastrado', [{ text: 'Fechar' }]);
            }catch(err){
                if(err.message != "Marca e produto não cadastrado")
                    console.log(err)
            }    
       }
    }

    if (isLoading) {
        return (
          <View style={styles.screen}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        );
      }

    return (
        <ScrollView>
            <Modal animationType='slide'
                visible={showModal}
                transparent={true}>
                    <KeyboardAvoidingView style={styles.modalContainer} behavior='height'>
                        <View style={styles.modal}>
                            <View style={styles.formControl}>
                                <View style={styles.closeIcon}>
                                    <TouchableOpacity onPress={() => add(setModal)}>
                                        <Ionicons
                                            name={Platform.OS === 'android' ? 'md-close' : 'ios-close'}
                                            size={25}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.label} >Digite o nome do item</Text>
                                <View style={styles.textContainer}>
                                    <TextInput
                                        style={styles.input}
                                        value={food.name}
                                        onChangeText={text => setFood(text)}
                                    />
                                    <TouchableOpacity onPress={() => add(setModal)}>
                                        <Ionicons
                                            name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                                            size={32}
                                            color='green'
                                        />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </KeyboardAvoidingView>
                
            </Modal>
            <View style={styles.screen}>
                <Text style={styles.text}>Cadastre os produtos quimicos da sua marca ou alimento.Caso não ache sua marca ou alimento aperte + para adiciona-los.</Text>
                <View style={styles.form}>
                    <View style={styles.formControl}>
                        <View style={styles.textContainer}>
                            <TextInput
                                style={styles.input}
                                value={barcode}
                                onChangeText={text => checkBarcode(text)}
                                placeholder='Código de barra'
                                keyboardType='number-pad'
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
                        <View style={styles.textContainer}>
                            <Autocomplete
                                data={foods}
                                value={food.name}
                                placeholder='Escolha o alimento'
                                onChangeText={text => selectFood(text)}
                                onPress={item => clickFood(item)} 
                            />
                            <TouchableOpacity onPress={() => setModal(true)}>
                                <Ionicons
                                    name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                                    size={32}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.formControl}>
                        <View style={styles.textContainer}>
                            <Autocomplete
                                data={brands}
                                value={brand.name}
                                placeholder='Escolha o marca'
                                onChangeText={text => selectBrand(text)}
                                onPress={item => clickBrand(item)}
                            />
                            <TouchableOpacity onPress={() => setModal(true)}>
                                <Ionicons
                                    name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                                    size={32}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={styles.list}>
                    <View style={styles.chemicalHeader} >
                        <Text style={styles.textChemical}>Selecione os produtos quimicos desse alimento.</Text>
                        <View style={styles.chemicalIcon} >
                            <TouchableOpacity>
                                <Ionicons
                                    name={Platform.OS === 'android' ? 'md-camera' : 'ios-camera'}
                                    size={32}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        chemicals ? chemicals.map(chemical => <Chemical name={chemical.name} key={chemical.id} />):null
                    }
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
        color: Colors.primaryColor
    },
    textChemical: {
        margin: 20,
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        width: '70%',
        color: Colors.primaryColor
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
        color: Colors.primaryColor
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
    closeIcon: {
        alignItems: 'flex-end'
    },
    chemicalHeader: {
        flexDirection: "row"
    },
    chemicalIcon: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default RegisterScreen;