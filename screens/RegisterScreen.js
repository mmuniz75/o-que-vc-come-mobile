import React, { useState, useEffect, useCallback,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform, Modal, Alert,KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import Colors from '../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/UI/HeaderButton';
import BarCode from '../components/UI/Barcode'

import * as actions from '../store/actions'
import Autocomplete from '../components/UI/AutoComplete'
import Chemical from '../components/UI/ChemicalSwitch'
import Model from '../models/Model'

import { LogBox } from 'react-native'
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])


const RegisterScreen = props => {
    const [isScanning, setIsScanning] = useState(false);
    const startObject = new Model(-1, "")
    
    const [newItemName, setNewItemName] = useState('');

    const [modalName, setModalName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chemicalsCheck, setChemicallsCheck] = useState([]);
    
    const [barcode, setBarcode] = useState('');
    const [brand, setBrand] = useState(startObject);
    const [food, setFood] = useState(startObject);
    
    const [brands, setBrands] = useState([]);
    const [foods, setFoods] = useState([]);
    
    const chemicals = useSelector(state => state.all_chemicals);
    const allBrands = useSelector(state => state.all_brands);
    const allFoods = useSelector(state => state.foods);

    const newFood  = useSelector(state => state.food);
    const newBrand = useSelector(state => state.brand);

    const dispatch = useDispatch();
    
    const scrollRef = useRef();
  
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
        if(props.navigation.getParam("barcode"))
            setBarcode(props.navigation.getParam("barcode"))
        
        if(newFood)    
            setFood(newFood)
        
        if(newBrand)    
            setBrand(newBrand)

        setIsLoading(true);
        loadChemicals()
        .then(() => loadBrands())
        .then(() => {
            setIsLoading(false);
        });
      }, [dispatch,newFood, newBrand]);

   
        
    const setCheck = (id, checked) => {
        let updatedChecks = [...chemicalsCheck];
        const chemical = chemicals.find(c => c.id ==id)
        if(checked)
            updatedChecks.push(chemical)
        else
            updatedChecks = updatedChecks.filter(c => c.id !=id)
        
        setChemicallsCheck(updatedChecks);
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
        scrollBotton()
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
        scrollBotton()
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

    const scrollBotton = () => {
        scrollRef.current.scrollTo({
            y: (100),
            animated: true,
        })
        
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

    const save = useCallback( async () => {
        try{
            if (!validate())
                return

            setIsLoading(true);
            let selectedChemicals = chemicalsCheck.map(c => c.id)

            if(selectedChemicals.length==0)
                selectedChemicals.push("0")

            await dispatch(actions.createBrandFood(brand.id, food.id, barcode, selectedChemicals));
            setIsLoading(false);
    
            Alert.alert('Confirmação', 'Cadastrado realizado', [
                {
                    text: 'OK',
                    style: 'default',
                    onPress: () => {
                        props.navigation.navigate('Main');
                    }
                }
            ]);
    
        }catch(err){
            setIsLoading(false);
            Alert.alert('Mensagem', err.message, [{ text: 'Fechar' }]);
        }  
    },[dispatch,brand.id, food.id, barcode, chemicalsCheck]);

    const createNewItem = async() => {
        if(newItemName == ''){
            Alert.alert('Mensagem', `Digite um ${modalName}`, [{ text: 'Fechar' }]);
            return
        }
        try{
            setIsLoading(true);

            if(modalName == 'Alimento')
                await dispatch(actions.createFood(newItemName));

            if(modalName == 'Marca')
                await dispatch(actions.createBrand(newItemName));

            setIsLoading(false);
            setModalName('')
            setNewItemName('')
    
        }catch(err){
            setIsLoading(false);
            Alert.alert('Mensagem', err.message, [{ text: 'Fechar' }]);
        }  
    }

    const validate = () => {
        const missingText = 'Dados faltando'
        if(food.id <1) {
            Alert.alert(missingText, 'Escolha uma alimento', [{ text: 'Fechar' }]);
            return false
        }

        if(brand.id <1) {
            Alert.alert(missingText, 'Escolha uma marca', [{ text: 'Fechar' }]);            
            return false
        }    

        if(barcode.length <13) {
            Alert.alert(missingText, 'Digite o codigo de barra', [{ text: 'Fechar' }]);            
            return false
        }   
        
        return true    
    }

    const openModal = (name) => {
        setNewItemName('')
        setModalName(name)
    }

    useEffect(() => {
        props.navigation.setParams({ saveFn: save });
      }, [save]);


    const scanBarcode = () => {
        setIsScanning(true)
    }

    const barcodeScanned = async (value) => {
        await playSound()
        setIsScanning(false)
        checkBarcode(value)
    }

    const [sound, setSound] = useState();
  
    async function playSound() {
      const { sound } = await Audio.Sound.createAsync(
         require('.././assets/beep.mp3')
      );
      setSound(sound);
      await sound.playAsync(); 
    }
  
    useEffect(() => {
      return sound
        ? () => {
              sound.unloadAsync(); }
        : undefined;
    }, [sound]);

    if (isLoading) {
        return (
          <View style={styles.screen}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
          </View>
        );
      }

    if(isScanning){
        return <BarCode onScanned={value => barcodeScanned(value)} onNotGranted={() => setIsScanning(false)}/>

    }else {    

        return (
            <ScrollView ref={scrollRef} scrollToOverflowEnabled={true}>
                <Modal animationType='slide'
                    visible={modalName != ''}
                    transparent={true}>
                        <KeyboardAvoidingView style={styles.modalContainer} behavior='height'>
                            <View style={styles.modal}>
                                <View style={styles.formControl}>
                                    <View style={styles.closeIcon}>
                                        <TouchableOpacity onPress={() => setModalName('')}>
                                            <Ionicons
                                                name={Platform.OS === 'android' ? 'md-close' : 'ios-close'}
                                                size={25}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.label} >Digite o nome do {modalName}</Text>
                                    <View style={styles.textContainer}>
                                        <TextInput
                                            style={styles.input}
                                            value={newItemName}
                                            onChangeText={text => setNewItemName(text)}
                                        />
                                        <TouchableOpacity onPress={() => createNewItem()}>
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
                                        onPress={() => scanBarcode()}
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
                                    scrollRef={scrollRef}
                                />
                                <TouchableOpacity onPress={() => openModal('Alimento')}>
                                    <Ionicons
                                        name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                                        size={32}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {food.id > 0 && <View style={styles.formControl}>
                                            <View style={styles.textContainer}>
                                                <Autocomplete
                                                    data={brands}
                                                    value={brand.name}
                                                    placeholder='Escolha o marca'
                                                    onChangeText={text => selectBrand(text)}
                                                    onPress={item => clickBrand(item)}
                                                    scrollRef={scrollRef}
                                                />
                                                <TouchableOpacity onPress={() => openModal('Marca')}>
                                                    <Ionicons
                                                        name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                                                        size={32}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                        }

                    </View>
                    
                    {food.id > 0 && brand.id > 0 &&  <View style={styles.list}>
                                        <View style={styles.chemicalHeader} >
                                            <Text style={styles.textChemical}>Selecione os produtos quimicos desse alimento.</Text>
                                            {false &&  <View style={styles.chemicalIcon} >
                                                            <TouchableOpacity>
                                                                <Ionicons
                                                                    name={Platform.OS === 'android' ? 'md-camera' : 'ios-camera'}
                                                                    size={32}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                            }
                                        </View>
                                        {
                                            chemicals ? chemicals.map(chemical => {

                                                return <Chemical name={chemical.name} 
                                                                key={chemical.id} 
                                                                checked={chemicalsCheck.some(c => c.id==chemical.id)}
                                                                onChange={ newValue => setCheck(chemical.id, newValue)}/>
                                            }    
                                            ):null
                                        }
                                    </View>
                    }    

                </View>
            </ScrollView>
        )
    }    
}

RegisterScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('saveFn');
    return {
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName={
                        Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                    }
                    onPress={saveFn}
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