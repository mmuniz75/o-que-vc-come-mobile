import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Switch, TouchableOpacity, TextInput, Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../constants/Colors';

import {CHEMICALS} from '../services/chemicalService'



const setCheck = (index,value,chemicalsCheck, setChemicallCheck) => {
    const updatedChecks = [...chemicalsCheck];
    updatedChecks[index] = value;
    setChemicallCheck(updatedChecks);
}

const renderChemical = (index,item,chemicalsCheck, setChemicallCheck) => {
     return <View style={styles.items}>
            <Text style={styles.item}>{item.name}</Text>
            <Switch value={chemicalsCheck} 
                    thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
                    trackColor={ {true : Colors.primaryColor}}
                    onValueChange={newValue => setChemicallCheck(newValue)}/>
           </View>
}

const RegisterScreen = props => {
    const [chemicalsCheck, setChemicallCheck] = useState(false);
    
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Cadastre os produtos quimicos da sua marca ou alimento.</Text>
            <View>
                <TextInput />
                <TouchableOpacity>
                    <Ionicons 
                        name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}  
                        size={23}
                    />
                </TouchableOpacity> 
            </View>   
            <FlatList  style={styles.list} data={CHEMICALS} renderItem={ ({item,index}) => renderChemical(index,item,chemicalsCheck, setChemicallCheck)} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen : {
       flex : 1,
       justifyContent : 'center',
       alignItems : 'center',
    },
    item : {
        fontFamily : 'open-sans',
        fontSize : 16,
        marginHorizontal : 15
    },
    items : {
        flexDirection : 'row',
        alignItems : 'center',
        flex : 1,
        marginVertical : 15,
        marginRight : 20,
        justifyContent : "space-between"
    },
    list : {
        width: '100%',
    },
    text : {
        marginVertical : 10,
        fontFamily : 'open-sans-bold',
        fontSize: 16,
        textAlign : 'center'
    },
    checkbox : {
        
        
    }
});

export default RegisterScreen;