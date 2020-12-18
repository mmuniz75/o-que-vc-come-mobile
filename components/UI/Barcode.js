import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, Alert, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

const BarCode = props => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
          //const { status } = await BarCodeScanner.requestPermissionsAsync();
          const { status } = await Permissions.askAsync(Permissions.CAMERA);
          setHasPermission(status === 'granted');
          
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        if(!scanned) {
            setScanned(true)
            props.onScanned(data.substring(0,13))
        }    
    };
   
    if (hasPermission === null) {
        return <Text></Text>;
    }

    if (hasPermission === false) {
        Alert.alert('Mensagem', "Para ler o codigo de barras é necessário autorizar o uso da camera do seu celular", [{ text: 'Fechar' }]);
        props.onNotGranted()
    }    
    
    return  <View
                    style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}>
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                <Button title={'Cancelar'} onPress={() => props.onNotGranted()} />
            </View>
    
}

export default BarCode