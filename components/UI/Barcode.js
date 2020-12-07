import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const BarCode = props => {
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        if (hasPermission === false) {
            Alert.alert('Mensagem', "Você não autorizou o uso da camera do seu celular", [{ text: 'Fechar' }]);
            props.onNotGranted()
        }    
        props.onScanned(data)
    };

    if (hasPermission === false) {
        Alert.alert('Mensagem', "Você não autorizou o uso da camera do seu celular", [{ text: 'Fechar' }]);
        return
    }else {    
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
                </View>
    }        
}

export default BarCode